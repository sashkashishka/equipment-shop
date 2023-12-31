#! /bin/bash

front_version=$FRONT_VERSION
strapi_version=$STRAPI_VERSION
dir=$DIR

echo 'Stop previous';
docker compose -f ~/$dir/deploy/docker-compose.yaml stop

echo 'Start db';
docker compose -f ~/$dir/deploy/docker-compose.yaml up db -d --wait

echo 'Start strapi';
docker compose -f ~/$dir/deploy/docker-compose.yaml up strapi -d --wait

echo 'Start nextjs';
docker compose -f ~/$dir/deploy/docker-compose.yaml up nextjs -d --wait

echo 'Start nginx';
docker compose -f ~/$dir/deploy/docker-compose.yaml up nginx -d --wait
