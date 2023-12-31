job "nginx" {
  type = "service"

  group "nginx_group" {
    count = 1

    network {
      mode = "host"
      port "nginx1" {
        to = 3000
        static = 3000
      }
      port "nginx2" {
        to = 8000
        static = 8000
      }
    }

    task "nginx" {
      driver = "docker"

      config {
        image = "nginx:1.25.3"
        ports =  ["nginx1", "nginx2"]
        volumes = [
          "local:/etc/nginx/conf.d",
        ]
      }

       restart {
         attempts = 2
       }

       template {
        data = <<EOH
          server {
            listen 3000;
            server_name ${hostname};

            location /${strapi_prefix} {
              rewrite ^/${strapi_prefix}/?(.*)$ /$1 break;

            {{ range nomadService "strapi" }}
              proxy_pass http://{{ .Address }}:{{ .Port }};
            {{ end }}
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
            }

            location / {
            {{ range nomadService "nextjs" }}
              proxy_pass http://{{ .Address }}:{{ .Port }};
            {{ end }}
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
              {{ range nomadService "strapi" }}
                proxy_pass http://{{ .Address }}:{{ .Port }};
              {{ end }}
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
