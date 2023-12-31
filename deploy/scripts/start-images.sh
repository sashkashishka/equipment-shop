#! /bin/bash

front_version=$FRONT_VERSION
strapi_version=$STRAPI_VERSION

docker compose -f ../docker-compose.yaml up nginx
# docker compose -f ../docker-compose.yaml up sashkashishka/pgi-front:$front_version
# docker pull sashkashishka/pgi-front:$front_version
# docker pull sashkashishka/pgi-strapi:$strapi_version

# TODO delete outdated images

