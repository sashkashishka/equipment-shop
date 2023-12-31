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
      }
    }

    service {
      name     = "strapi"
      provider = "nomad"
      port     = "strapi"
    }

    task "strapi" {
      driver = "docker"

      config {
        image = "${strapi_image}"
        ports =  ["strapi"]
      }

       restart {
         attempts = 2
       }

      template {
        data = <<EOH
          {{ range nomadService "db" }}
            DATABASE_HOST={{ .Address }}
            DATABASE_PORT={{ .Port }}
          {{ end }}
        EOH

        destination = "secrets/config.env"
        env         = true
      }

      env {
        APP_KEYS = "${strapi_app_keys}"
        API_TOKEN_SALT = "${strapi_api_token_salt}"
        ADMIN_JWT_SECRET= "${strapi_admin_jwt_secret}"
        TRANSFER_TOKEN_SALT= "${strapi_transfer_token_salt}"

        DATABASE_NAME="${db_name}"
        DATABASE_USERNAME="${db_user}"
        DATABASE_PASSWORD="${db_password}"
        DATABASE_SSL=false
        JWT_SECRET="${jwt_secret}"
      }
    }
  }
}
