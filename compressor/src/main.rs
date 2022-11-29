use clap::Parser;
use itertools::izip;
use notify::{watcher, DebouncedEvent, RecursiveMode, Watcher};
use pathdiff::diff_paths;
use std::env;
use std::fs::{self};
use std::io::{Error, ErrorKind};
use std::path::{Path, PathBuf};
use std::process::{Command, Output};
use std::time::Duration;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;

type CompFn = dyn Fn(&Path, &Path) -> Result<Output, Error> + Send;

fn compress(src: &Path, dst: &Path, size: usize, qty: usize) -> Result<Output, Error> {
    // convert $INPUTFILE -resize 1024x -quality 20% $OUTPUTFILE;
    let mut cmd = Command::new("convert");
    cmd.arg(src.to_str().unwrap())
        .arg("-resize")
        .arg(format!("{}x{}", size, size).as_str())
        .arg("-quality")
        .arg(format!("{}%", qty).as_str())
        .arg("-auto-gamma")
        .arg("-auto-level")
        .arg("-auto-orient")
        .arg(dst.to_str().unwrap());
    cmd.output()
}

fn comp_fn_factory(size: usize, qty: usize) -> Box<CompFn> {
    Box::new(move |src: &Path, dst: &Path| -> Result<Output, Error> {
        compress(src, dst, size, qty)
    })
}

struct Compressor {
    comp_fn: Box<CompFn>,
}

impl Compressor {
    fn new(comp_fn: Box<CompFn>) -> Self {
        Compressor { comp_fn }
    }

    fn comp_image(&self, src_abs_path: &Path, dst_abs_path: &Path) -> Result<(), Error> {
        let prefix = dst_abs_path
            .parent()
            .ok_or_else(|| Error::from(ErrorKind::InvalidData))?;
        std::fs::create_dir_all(prefix)?;
        (self.comp_fn)(src_abs_path, dst_abs_path)
            .map_err(|err| -> Error { Error::new(ErrorKind::InvalidData, err) })
            .map(|_| {})
    }
}

#[derive(Clone, Debug)]
enum CompressorAction {
    Create(PathBuf),
    Remove(PathBuf),
    Rename(PathBuf, PathBuf),
}

struct CompressorScheduler {
    comp_tasks: Vec<(JoinHandle<()>, mpsc::UnboundedSender<CompressorAction>)>,
}

impl CompressorScheduler {
    fn new() -> Self {
        CompressorScheduler {
            comp_tasks: Vec::new(),
        }
    }

    fn add_compressor(&mut self, comp: Compressor, dest_folder: PathBuf, watch_folder: PathBuf) {
        let (tx, mut rx) = mpsc::unbounded_channel::<CompressorAction>();
        let task = tokio::spawn(async move {
            while let Some(event) = rx.recv().await {
                println!("{} -- {:?}", dest_folder.to_str().unwrap(), event);
                match event {
                    CompressorAction::Create(path) => {
                        comp.comp_image(path.as_path(), dest_folder.join(diff_paths(path.clone(), watch_folder.clone()).unwrap()).as_ref())
                            .unwrap_or_else(|err| println!("{}", err));
                    }
                    CompressorAction::Remove(path) => {
                        let path_conv = dest_folder.join(diff_paths(path.clone(), watch_folder.clone()).unwrap());
                        if path_conv.as_path().is_dir() {
                            fs::remove_dir_all::<&Path>(path_conv.as_ref())
                                .unwrap_or_else(|err| println!("{}", err));
                        } else {
                            fs::remove_file::<&Path>(path_conv.as_ref())
                                .unwrap_or_else(|err| println!("{}", err));
                        }
                    }
                    CompressorAction::Rename(from, to) => {
                        fs::rename::<&Path, &Path>(
                            dest_folder.join(diff_paths(from.clone(), watch_folder.clone()).unwrap()).as_ref(),
                            dest_folder.join(diff_paths(to.clone(), watch_folder.clone()).unwrap()).as_ref(),
                        )
                        .unwrap_or_else(|err| println!("{}", err));
                    }
                }
            }
        });
        self.comp_tasks.push((task, tx));
    }
    // fn remove_compressor(&mut self, index: usize) -> Result<(), Error> {
    //     self.comp_tasks
    //         .get(index)
    //         .ok_or_else(|| Error::from(ErrorKind::InvalidData))?
    //         .0
    //         .abort();
    //     self.comp_tasks.remove(index);
    //     Ok(())
    // }

    fn clear(&mut self) {
        for (handle, _) in self.comp_tasks.iter() {
            handle.abort();
        }
        self.comp_tasks.clear();
    }

    fn notify_all(&self, action: CompressorAction) -> Result<(), Error> {
        for comp in self.comp_tasks.iter() {
            comp.1
                .send(action.clone())
                .map_err(|err| -> Error { Error::new(ErrorKind::BrokenPipe, err) })?;
        }
        Ok(())
    }
}

/// Image compressor daemon
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// folder to watch images for
    #[arg(short, long)]
    watch: String,

    /// List of compressors destination folders
    #[arg(short, long)]
    dest: Vec<String>,

    /// Target sizes for each compressor
    #[arg(short, long)]
    size: Vec<usize>,

    /// Target qualities for each compressor
    #[arg(short, long)]
    qty: Vec<usize>,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let args = Args::parse();

    assert!(
        args.dest.len() == args.size.len() && args.size.len() == args.qty.len(),
        "lists not equal invalid args"
    );

    let dir = Path::new(&(args.watch));
    let work_dir = env::current_dir()?;
    let mut scheduler = CompressorScheduler::new();

    assert!(
        dir.exists() && dir.is_dir(),
        "watch path is not dir o does not exist"
    );

    println!("watching:\t{}", dir.to_str().unwrap());
    println!("workdir:\t{}", work_dir.to_str().unwrap());
    for comp in izip!(args.dest, args.size, args.qty) {
        scheduler.add_compressor(
            Compressor::new(comp_fn_factory(comp.1, comp.2)),
            Path::new(&comp.0).to_path_buf(),
            Path::new(&dir).to_path_buf(),
        );
        println!(
            "compressor:\tdest:{} size:{} qty:{}",
            comp.0, comp.1, comp.2
        )
    }

    let (tx, rx) = std::sync::mpsc::channel();
    let mut watcher = watcher(tx, Duration::from_secs(1)).unwrap();
    watcher.watch(dir, RecursiveMode::Recursive).unwrap();

    while let Ok(event) = rx.recv() {
        let action = match event {
            DebouncedEvent::Create(path) => {
                CompressorAction::Create(diff_paths(path, work_dir.clone()).unwrap())
            }
            DebouncedEvent::Remove(path) => {
                CompressorAction::Remove(diff_paths(path, work_dir.clone()).unwrap())
            }
            DebouncedEvent::Rename(from, to) => CompressorAction::Rename(
                diff_paths(from, work_dir.clone()).unwrap(),
                diff_paths(to, work_dir.clone()).unwrap(),
            ),
            _ => {
                continue;
            }
        };
        scheduler.notify_all(action).unwrap();
    }

    scheduler.clear();

    Ok(())
}
