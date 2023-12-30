terraform {
  required_providers {
    nomad = {
      source  = "hashicorp/nomad"
      version = "1.4.20"
    }
  }
}

provider "nomad" {
  address   = var.nomad_addr
  secret_id = var.nomad_token
}

# resource "nomad_job" "app" {
#   jobspec = templatefile(
#     "${path.module}/nomad/app.nomad.tpl",
#     {
#       hostname    = var.hostname,
#       strapi_prefix    = var.strapi_prefix,
#       mysql_root_password = var.mysql_root_password,
#       db_name     = var.db_name,
#       db_user         = var.db_user,
#       db_password     = var.db_password,
#       docker_username = var.docker_username,
#       strapi_version = var.strapi_version,
#       strapi_app_keys            = var.strapi_app_keys,
#       strapi_api_token_salt      = var.strapi_api_token_salt,
#       strapi_admin_jwt_secret    = var.strapi_admin_jwt_secret,
#       strapi_transfer_token_salt = var.strapi_transfer_token_salt,
#       jwt_secret                 = var.jwt_secret,
#       front_version = var.front_version,
#       strapi_api_token = var.strapi_api_token,
#       node_env        = var.node_env,
#     }
#   )
# }

resource "nomad_job" "db" {
  jobspec = templatefile(
    "${path.module}/nomad/db.nomad.tpl",
    {
      mysql_root_password = var.mysql_root_password,
      db_name     = var.db_name,
      db_user         = var.db_user,
      db_password     = var.db_password,
    }
  )
}

resource "nomad_job" "strapi" {
  jobspec = templatefile(
    "${path.module}/nomad/strapi.nomad.tpl",
    {
      hostname    = var.hostname,
      strapi_prefix    = var.strapi_prefix,
      mysql_root_password = var.mysql_root_password,
      db_name     = var.db_name,
      db_user         = var.db_user,
      db_password     = var.db_password,
      docker_username = var.docker_username,
      strapi_version = var.strapi_version,
      strapi_app_keys            = var.strapi_app_keys,
      strapi_api_token_salt      = var.strapi_api_token_salt,
      strapi_admin_jwt_secret    = var.strapi_admin_jwt_secret,
      strapi_transfer_token_salt = var.strapi_transfer_token_salt,
      jwt_secret                 = var.jwt_secret,
      front_version = var.front_version,
      strapi_api_token = var.strapi_api_token,
      node_env        = var.node_env,
    }
  )
  depends_on = [
    nomad_job.db
  ]
}

# resource "nomad_job" "nextjs" {
#   jobspec = templatefile(
#     "${path.module}/nomad/nextjs.nomad.tpl",
#     {
#       node_env        = var.node_env,
#       docker_username = var.docker_username,
#       strapi_prefix    = var.strapi_prefix,
#       strapi_host      = var.strapi_host,
#       front_version = var.front_version
#     }
#   )
#   depends_on = [
#     nomad_job.strapi
#   ]
# }

# resource "nomad_job" "nginx" {
#   jobspec = templatefile(
#     "${path.module}/nomad/nginx.nomad.tpl",
#     {
#        strapi_prefix    = var.strapi_prefix,
#     }
#   )
#   depends_on = [
#     nomad_job.strapi
#   ]
# }

variable "mysql_root_password" {
  description = "Mysql root password"
  type        = string
}

variable "db_name" {
  description = "prisma database name"
  type        = string
}

variable "db_user" {
  description = "mysql user name"
  type        = string
}

variable "db_password" {
  description = "mysql user password"
  type        = string
}

variable "nomad_token" {
  description = "nomad token"
  type        = string
}

variable "nomad_addr" {
  description = "nomad addr"
  type        = string
}

variable "node_env" {
  description = "node js env"
  type        = string
  default     = "production"
}

variable "docker_username" {
  description = "docker registry username"
  type        = string
}

variable "strapi_version" {
  description = "strapi docker image version"
  type        = string
}

variable "front_version" {
  description = "front docker image version"
  type        = string
}

# variable "strapi_db_host" {
#   description = "strapi db host"
#   type        = string
# }

# variable "strapi_db_port" {
#   description = "strapi db port"
#   type        = string
# }

variable "strapi_app_keys" {
  description = "strapi app keys"
  type        = string
}

variable "strapi_api_token_salt" {
  description = "strapi api token salt"
  type        = string
}

variable "strapi_admin_jwt_secret" {
  description = "strapi admin jwt secret"
  type        = string
}

variable "strapi_transfer_token_salt" {
  description = "strapi transfer token salt"
  type        = string
}

variable "jwt_secret" {
  description = "strapi jwt secret"
  type        = string
}

# variable "strapi_host" {
#   description = "strapi host"
#   type        = string
# }

variable "strapi_prefix" {
  description = "strapi prefix"
  type        = string
}

variable "strapi_api_token" {
  description = "strapi api token"
  type        = string
}

variable "hostname" {
  description = "hostname"
  type        = string
}
