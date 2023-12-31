#! /bin/bash

front_version=$FRONT_VERSION
strapi_version=$STRAPI_VERSION


echo "FrontVersion:"
echo $front_version

echo "StrapiVersion:"
echo $strapi_version

docker pull sashkashishka/pgi-front:$front_version
docker pull sashkashishka/pgi-strapi:$strapi_version

# TODO delete outdated images
echo "Pulled successfully"
