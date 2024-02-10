#!/bin/bash

front_version=$FRONT_VERSION
strapi_version=$STRAPI_VERSION
dir=$DIR

ENV_FILE="$HOME/$dir/deploy/envs/.env.strapi"
source "$ENV_FILE"

STRAPI_EXPORT_CMD="docker compose -f ~/$dir/deploy/docker-compose.yaml exec strapi npm run strapi export -- --key '$STRAPI_EXPORT_KEY' --file strapi-export"
STRAPI_CP_CMD="docker compose -f ~/$dir/deploy/docker-compose.yaml cp strapi:/opt/app/strapi-export.tar.gz.enc ~/$dir/backup/strapi-export.tar.gz.enc"

DB_DUMP_CMD="docker compose -f ~/$dir/deploy/docker-compose.yaml exec db mysqldump -u $MYSQL_ROOT_USER -p\"$MYSQL_ROOT_PASSWORD\" $MYSQL_DATABASE > ~/$dir/backup/strapi-dump.sql"

echo "" > jobs.txt

echo "0 12 * * 0 $STRAPI_EXPORT_CMD && $STRAPI_CP_CMD" >> jobs.txt
echo "0 13 * * 0 $DB_DUMP_CMD" >> jobs.txt

crontab jobs.txt

echo "Cron job added successfully."
