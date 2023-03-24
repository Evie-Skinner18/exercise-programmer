terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.27.0"
    }
  }

  backend "s3" {
    bucket = "exercise-statefile"
    key = "exercise_dev/s3/terraform.tfstate"
    encrypt = true
    region = "eu-west-2"
    profile = "exercise_dev"
  }
}

provider "aws" {
  region = var.aws_region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

resource "aws_ecr_repository" "exercise-programmer-backend" {
  name         = var.frontend_ecr_repository_name
  force_delete = true
}

resource "aws_ecr_repository" "exercise-programmer-frontend" {
  name         = var.backend_ecr_repository_name
  force_delete = true
}