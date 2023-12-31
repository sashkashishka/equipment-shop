job "nginx" {
  type = "service"

  group "nginx_group" {
    count = 1

    network {
      mode = "host"
      port "nginx" {
        to = 80
        static = 80
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
              proxy_pass http://localhost:1337;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }

            location / {
              # Handle other requests with the Next.js server on localhost
              proxy_pass http://localhost:3000;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }
          }


          {{ range nomadService "strapi" }}
            server {
              listen 80;
              server_name content.${hostname};

              location / {
                proxy_pass http://{{ .Address }}:{{ .Port }};
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
              }
            }
          {{ end }}
        EOH

        destination = "$${NOMAD_TASK_DIR}/nginx.conf"
      }
    }
  }
}
