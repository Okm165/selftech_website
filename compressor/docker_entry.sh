#!/bin/bash
cargo build --release
cargo run --release -- -w resources/tiles -d resources/_tiles -s 1024 -q 90 &
cargo run --release -- -w resources/images -d resources/_quality -s 1024 -q 90 -d resources/_thumbnail -s 512 -q 40;