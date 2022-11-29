FROM node
WORKDIR /app

COPY docker_build.sh docker_build.sh
COPY docker_entry.sh docker_entry.sh
COPY docker_entry_build.sh docker_entry_build.sh

RUN ./docker_build.sh