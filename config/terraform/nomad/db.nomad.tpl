job "database" {
  type = "service"

  group "db_group" {
    count = 1

    volume "db_data" {
      type = "host"
      source = "db_storage"
    }

    network {
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
        mount {
          type = "bind"
          source = "local"
          target = "/docker-entrypoint-initdb.d"
       }
      }

      restart {
        attempts = 1
      }

       template {
        data = <<EOH
          CREATE DATABASE IF NOT EXISTS ${db_name};
          CREATE USER IF NOT EXISTS '${db_user}'@'%' IDENTIFIED BY '${db_password}';
          GRANT ALTER,CREATE,DELETE,DROP,INDEX,INSERT, REFERENCES, SELECT,UPDATE,TRIGGER,ALTER ROUTINE, CREATE ROUTINE, EXECUTE, CREATE TEMPORARY TABLES ON ${db_name}.* TO '${db_user}'@'%';
        EOH

        destination = "$${NOMAD_TASK_DIR}/init.sql"
      }

      env {
        MYSQL_ROOT_PASSWORD = "${mysql_root_password}"
      }
    }
  }
}
