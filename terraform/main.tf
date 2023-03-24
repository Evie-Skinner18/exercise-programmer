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

# ecs
resource "aws_ecs_cluster" "exercise-programmer" {
  name         = var.ecs_cluster_name
}

resource "aws_alb_target_group" "backend-target-group" {
  name        = "backend-target-group"
  port        = var.backend_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_resource_id
}

resource "aws_alb" "backend-alb" {
  name         = "backend-alb"
  subnets      = [module.security-groups.public-subnet-1,module.security-groups.public-subnet-2]
  internal     = false
  security_groups = [ module.security-groups.backend-lb-security-group-id ]
}

resource "aws_alb_listener" "backend-listener" {
  load_balancer_arn = aws_alb.backend-alb.arn
  default_action {
    type = "forward"
    target_group_arn = aws_alb_target_group.backend-target-group.arn
  }
  port              = 80
}

resource "aws_ecs_task_definition" "backend-task-definition" {
  family                    = "backend"
  execution_role_arn        = module.iam.iam-role-arn
  requires_compatibilities  = ["FARGATE"]
  network_mode              = "awsvpc"
  cpu                       = var.backend_fargate_cpu
  memory                    = var.backend_fargate_memory
  container_definitions     = jsonencode([{
    name : "backend",
    image : "${aws_ecr_repository.exercise-programmer-backend.repository_url}:${var.backend_image_tag}",
    portMappings : [
      {
        containerPort : var.backend_port
        hostPort : var.backend_port
      }
    ],
    healthCheck : {
      retries : 6,
      command : [
        "CMD-SHELL", "curl -f http://localhost:5001/health || exit 1"
      ],
    }
  }])
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "ARM64"
  }
}

resource "aws_ecs_service" "backend-service" {
  name            = "backend"
  cluster         = aws_ecs_cluster.exercise-programmer.id
  task_definition = aws_ecs_task_definition.backend-task-definition.arn
  launch_type     = "FARGATE"
  desired_count   = 1
  health_check_grace_period_seconds = 600
  wait_for_steady_state = false
  depends_on = [
    aws_alb_listener.backend-listener,
  ]

  network_configuration {
    security_groups   = [module.security-groups.backend-id]
    subnets           = [module.security-groups.public-subnet-1]
    assign_public_ip  = true
  }
  
  load_balancer {
    target_group_arn  = aws_alb_target_group.backend-target-group.arn
    container_name    = "backend"
    container_port    = var.backend_port
  }
}

resource "aws_ecs_task_definition" "frontend-task-definition" {
  family                = "frontend"
  execution_role_arn = module.iam.iam-role-arn
  requires_compatibilities  = ["FARGATE"]
  network_mode              = "awsvpc"
  cpu                       = var.frontend_fargate_cpu
  memory                    = var.frontend_fargate_memory
  container_definitions = jsonencode([{
    name : "frontend",
    image : "${aws_ecr_repository.exercise-programmer-frontend-repository.repository_url}:${var.frontend_image_tag}",
    portMappings : [
      {
        containerPort : var.frontend_port
        hostPort : var.frontend_port
      }
    ],
    healthCheck : {
      retries : 6,
      command : [
        "CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"
      ],
    }
  }])
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "ARM64"
  }
}

resource "aws_ecs_service" "frontend" {
  name = "frontend"
  cluster = aws_ecs_cluster.exercise-programmer-ecs-cluster.id
  task_definition = aws_ecs_task_definition.frontend-task-definition.arn
  launch_type = "FARGATE"
  desired_count = 1
  health_check_grace_period_seconds = 600
  wait_for_steady_state = false
  depends_on = [
    aws_alb_listener.frontend-listener,
  ]
  
  network_configuration {
    security_groups = [module.security-groups.frontend-security-group-id]
    subnets         = [module.security-groups.public-subnet-1]
    assign_public_ip = true
  }
}