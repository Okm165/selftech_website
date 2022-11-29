FROM rust
WORKDIR /app

COPY src/ src/
COPY Cargo.toml Cargo.toml
COPY docker_build.sh docker_build.sh
COPY docker_entry.sh docker_entry.sh

RUN ./docker_build.sh