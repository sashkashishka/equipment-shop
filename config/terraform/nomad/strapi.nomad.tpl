job "strapi" {
  type = "service"

  group "strapi_group" {
    count = 1

    volume "strapi_data" {
      type = "host"
      source = "strapi_storage"
    }

    network {
      mode = "host"
      port "strapi" {
        to = 1337
        static = 1337
      }
    }

    service {
      name     = "strapi"
      provider = "nomad"
      port     = "strapi"
    }

    task "strapi" {
      driver = "docker"

      volume_mount {
        volume      = "strapi_data"
        destination = "/opt/app/public"
        propagation_mode = "private"
      }

      config {
        image = "${docker_username}/pgi-strapi:${version}"
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

        DATABASE_HOST="localhost"
        DATABASE_PORT="3306"
        DATABASE_NAME="${db_name}"
        DATABASE_USERNAME="${db_user}"
        DATABASE_PASSWORD="${db_password}"
        DATABASE_SSL=false
        JWT_SECRET="${jwt_secret}"
      }
    }
  }
}


