job "database" {
  type = "service"

  group "db_group" {
    count = 1

    volume "db_data" {
      type = "host"
      source = "db_storage"
    }

    network {
      mode = "host"
      port "db" {
        to = 3306
        static = 3306
      }
    }

    service {
      name     = "db"
      provider = "nomad"
      port     = "db"
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
  }
}
