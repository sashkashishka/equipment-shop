job "nextjs" {
  type = "service"

  group "nextjs_group" {
    count = 1

    volume "nextjs_data" {
      type = "host"
      source = "nextjs_storage"
    }

    network {
      mode = "host"
      port "nextjs" {
        to = 3000
        static = 3000
      }
    }

    service {
      name     = "nextjs"
      provider = "nomad"
      port     = "nextjs"
      check {
        name = "nextjs_check"
        type = "http"
        method = "get"
        path = "/api/healthcheck"
        timeout = "30s"
        interval = "5s"
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
        image = "${docker_username}/pgi-front:${version}"
        ports =  ["nextjs"]
      }

       restart {
         attempts = 2
       }

      env {
        STRAPI_PREFIX = "${strapi_prefix}"
        STRAPI_HOST = "${strapi_host}"
        STRAPI_API_TOKEN = "${strapi_api_token}"
        NODE_ENV = "${node_env}"
      }
    }
  }
}

