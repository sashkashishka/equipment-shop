job "application" {
  type = "service"

  group "app" {
    count = 1

    volume "db_data" {
      type = "host"
      source = "db_storage"
    }

    network {
      mode = "host"
      port "db" {
        to = 3306
      }
      port "nginx" {
        to = 80
        static = 80
      }
      port "strapi" {
        to = 1337
      }
      port "nextjs" {
        to = 3000
      }
    }

    service {
      name     = "nginx"
      provider = "nomad"
      port     = "nginx"
    }

    task "nginx" {
      driver = "docker"

      config {
        image = "nginx:1.25.3"
        ports =  ["nginx"]
      }

       restart {
         attempts = 2
       }

       template {
        data = <<EOH
          server {
            listen 80;
            server_name ${hostname};

            location /${strapi_prefix} {
              rewrite ^/${strapi_prefix}/?(.*)$ /$1 break;
              proxy_pass http://$${NOMAD_ADDR_strapi}:$${NOMAD_PORT_strapi};
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }

            location / {
              proxy_pass http://$${NOMAD_ADDR_nextjs}:$${NOMAD_PORT_nextjs};
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }
          }

          server {
            listen 80;
            server_name content.${hostname};

            location / {
              proxy_pass http://$${NOMAD_ADDR_strapi}:$${NOMAD_PORT_strapi};
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }
          }
        EOH

        destination = "$${NOMAD_TASK_DIR}/nginx.conf"
      }
    }


    task "db" {
      driver = "docker"

      volume_mount {
        volume      = "db_data"
        destination = "/var/lib/mysql"
        propagation_mode = "private"
      }

      config {
        image = "mysql:8.2.0"
        ports =  ["db"]
      }

      restart {
        attempts = 1
      }

      env {
        MYSQL_ROOT_PASSWORD = "${mysql_root_password}"
        MYSQL_DATABASE="${db_name}"
        MYSQL_USER="${db_user}"
        MYSQL_PASSWORD="${db_password}"
      }

      resources {
        memory = 500
        memory_max = 620
      }
    }


    task "strapi" {
      driver = "docker"

      config {
        image = "${docker_username}/pgi-strapi:${strapi_version}"
        ports =  ["strapi"]
      }

       restart {
         attempts = 2
       }

      env {
        APP_KEYS = "${strapi_app_keys}"
        API_TOKEN_SALT = "${strapi_api_token_salt}"
        ADMIN_JWT_SECRET= "${strapi_admin_jwt_secret}"
        TRANSFER_TOKEN_SALT= "${strapi_transfer_token_salt}"

        DATABASE_HOST="$${NOMAD_ADDR_db}"
        DATABASE_PORT="$${NOMAD_PORT_db}"
        DATABASE_NAME="${db_name}"
        DATABASE_USERNAME="${db_user}"
        DATABASE_PASSWORD="${db_password}"
        DATABASE_SSL=false
        JWT_SECRET="${jwt_secret}"
      }
    }


    task "nextjs" {
      driver = "docker"

      volume_mount {
        volume      = "nextjs_data"
        destination = "/usr/app/host-content"
        propagation_mode = "private"
      }

      config {
        image = "${docker_username}/pgi-front:${front_version}"
        ports =  ["nextjs"]
      }

       restart {
         attempts = 2
       }

      env {
        STRAPI_PREFIX = "${strapi_prefix}"
        STRAPI_HOST = "$${NOMAD_ADDR_strapi}"
        STRAPI_API_TOKEN = "${strapi_api_token}"
        NODE_ENV = "${node_env}"
      }
    }
  }
}
