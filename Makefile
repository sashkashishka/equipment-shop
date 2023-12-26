start:
	docker compose -f docker-compose.dev.yaml up

start_db:
	docker compose -f docker-compose.dev.yaml up db

start_nextjs:
	docker compose -f docker-compose.dev.yaml up nextjs

build:
	docker compose -f docker-compose.dev.yaml build

build_nocache:
	docker compose -f docker-compose.dev.yaml build --no-cache

build_nocache_nextjs:
	docker compose -f docker-compose.dev.yaml build --no-cache nextjs

build_nocache_strapi:
	docker compose -f docker-compose.dev.yaml build --no-cache strapi

exec_strapi_sh:
	docker compose -f docker-compose.dev.yaml exec -it strapi /bin/sh

restart_strapi:
	docker compose -f docker-compose.dev.yaml restart strapi

restart_nextjs:
	docker compose -f docker-compose.dev.yaml restart nextjs

restart_db:
	docker compose -f docker-compose.dev.yaml restart db
