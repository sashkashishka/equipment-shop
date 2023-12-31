job "nginx" {
  type = "service"

  group "nginx_group" {
    count = 1

    network {
      mode = "bridge"
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
        volumes = [
          "local:/etc/nginx/conf.d",
        ]
      }

       restart {
         attempts = 2
       }

       template {
        data = <<EOH
          upstream strapi {
            {{ range nomadService "strapi" }}
              server {{ .Address }}:{{ .Port }};
            {{ end }}
          }

          upstream front {
            {{ range nomadService "nextjs" }}
              server {{ .Address }}:{{ .Port }};
            {{ end }}
          }

          server {
            listen 80;
            server_name ${hostname};

            location /${strapi_prefix} {
              rewrite ^/${strapi_prefix}/?(.*)$ /$1 break;
              proxy_pass http://strapi;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }

            location / {
              proxy_pass http://front;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }
          }


            server {
              listen 8000;
              server_name ${hostname};

              location / {
                proxy_pass http://strapi;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
              }
            }
        EOH

        destination = "local/nginx.conf"
      }
    }
  }
}
