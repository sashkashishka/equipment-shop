#! /bin/bash

front_version=$FRONT_VERSION
strapi_version=$STRAPI_VERSION

docker pull sashkashishka/pgi-front:$front_version
docker pull sashkashishka/pgi-strapi:$strapi_version

# TODO delete outdated images
