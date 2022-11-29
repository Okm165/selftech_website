import { Component, createSignal, Index, JSX, onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import { listDirQuality, listDirThumbnail } from "api";
import Thumbnail from "components/Thumbnail";

const Gallery: Component<JSX.HTMLAttributes<HTMLDivElement>> = () => {
  const params = useParams();

  const [list, setList] = createSignal<string[]>();

  onMount(async () => {
    let data = await listDirThumbnail(params.id);
    setList(data);
  })



  return (
    <div class="flex flex-wrap justify-center">
      <Index each={list()}>
        {(el, i) =>
          <Thumbnail url={el()}/>
        }
      </Index>
    </div>
  );
};

export default Gallery;
