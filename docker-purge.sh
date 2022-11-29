#!/bin/bash

Help() {
  # Display Help
   echo "docker data purge script"
   echo ""
   echo "Usage: "
   echo "docker-purge             -- run total purge"
   echo "docker-purge [OPTIONS]   -- clear only specified in [OPTIONS]"
   echo ""
   echo "options:"
   echo "-c  docker clear cache     { docker rm -f \$(docker ps -aq)' }"
   echo "-i  docker clear images    { docker image rm -f \$(docker image ls -aq) }"
   echo "-v  docker clear volumes   { docker volume rm -f \$(docker volume ls -q) }"
   echo "-n  docker clear networks  { docker network rm \$(docker network ls -q) }"
   echo "-b  docker clear builder   { docker builder prune -f }"
   echo ""
}

CMD_CACHE=0
CMD_IMAGES=0
CMD_VOLUMES=0
CMD_NETWORKS=0
CMD_BUILDER=0

if [ $# -eq 0 ]; then 

  CMD_CACHE=1
  CMD_IMAGES=1
  CMD_VOLUMES=1
  CMD_NETWORKS=1
  CMD_BUILDER=1

  elif [ $1 == "-h" -o $1 == "--help" ]; then
    Help
    exit 0

  else
    while getopts 'civnb' opt; do
      case $opt in
        c)
          CMD_CACHE=1 ;;
        i)
          CMD_IMAGES=1 ;;
        v)
          CMD_VOLUMES=1 ;;
        n)
          CMD_NETWORKS=1 ;;
        b)
          CMD_BUILDER=1 ;;
      esac
    done
fi

COLOR='\033[0;34m'
NC='\033[0m' # No Color

if [ $CMD_CACHE -eq 1 ]; then
  printf "${COLOR}clearing docker cache\n${NC}"
  docker rm -f $(docker ps -aq)
fi
if [ $CMD_IMAGES -eq 1 ]; then
  printf "${COLOR}clearing docker images\n${NC}"
  docker image rm -f $(docker image ls -aq)
fi
if [ $CMD_VOLUMES -eq 1 ]; then
  printf "${COLOR}clearing docker volumes\n${NC}"
  docker volume rm -f $(docker volume ls -q)
fi
if [ $CMD_NETWORKS -eq 1 ]; then
  printf "${COLOR}clearing docker networks\n${NC}"
  docker network rm $(docker network ls -q)
fi
if [ $CMD_BUILDER -eq 1 ]; then
  printf "${COLOR}clearing docker builder\n${NC}"
  docker builder prune -f
fi

printf "${COLOR}done\n${NC}"
exit 0
