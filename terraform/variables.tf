variable "public_fqdn" {
  type        = string
  description = "The fully qualified domain name of the publicly accessible parts of the application"
}
variable "aws_region" {
  type        = string
  description = "The AWS region resources are created in"
  default     = "eu-west-2"
}
variable "az_count" {
  type        = number
  description = "Number of AZs to cover in a given region"
}
# See docs: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html
variable "ecs_fargate_version" {
  type        = string
  description = "The version of fargate to run the ECS tasks on"
}
variable "ecs_cluster_name" {
  type        = string
  description = "The name of the ECS Fargate cluster"
}
variable "frontend_image" {
  type        = string
  description = "Docker image to run in the ECS cluster for the front end webapp"
  default     = "exercise-frontend"
}
variable "frontend_image_tag" {
  type        = string
  description = "Hash of the relevant commit to the exercise-programmer repo"
}
variable "frontend_port" {
  type        = number
  description = "Port exposed by the docker image to redirect traffic to for the front end webapp"
  default     = 3000
}
variable "frontend_count" {
  type        = number
  description = "Number of docker containers to run for the front end webapp"
}
variable "frontend_health_check_path" {
  type        = string
  description = "Health check path used by the Application Load Balancer for the front end webapp"
  default     = "/api/health"
}
// See docs for ecs task definition: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
variable "frontend_fargate_cpu" {
  type        = number
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units) for the front end webapp"
  default     = 1024
}
variable "frontend_fargate_memory" {
  type        = number
  description = "Fargate instance memory to provision (in MiB) for the front end webapp"
  default     = 2048
}
variable "frontend_ecr_repository_name" {
  type        = string
  description = "The name of the Elastic Container Repository for our frontend container images"
}
// See docs for ecs task definition: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
variable "apply_immediately" {
  type        = bool
  description = "Apply changes to infrastrucure immediately"
  default     = true
}
variable "enable_alerts" {
  type        = bool
  description = "When enabled CloudWatch alarm events are sent to the Alerts SNS Topic"
  default     = false
}
variable "backend_service_minimum_task_count" {
  type        = number
  description = "Minimum number of expected tasks to be running for the backend Service"
  default     = 1
}
variable "frontend_minimum_task_count" {
  type        = number
  description = "Minimum number of expected tasks to be running for the front end webapp"
  default     = 1
}
variable "ssl_certificate_arn" {
  type        = string
  description = "ARN of ssl certificate generated in the AWS dashboard"
}
variable "backend_image" {
  type        = string
  description = "The name of the image for the backend application"
  default     = "exercise-backend"
}
variable "backend_image_tag" {
  type        = string
  description = "The image tag of the backend application to be deployed"
}
variable "backend_count" {
  type        = number
  description = "Number of docker containers to run for the backend application"
  default     = 1
}
variable "backend_port" {
  type        = number
  description = "Port exposed by the docker image to redirect traffic to for the DROITS Service"
  default     = 5001
}
variable "backend_health_check_path" {
  type        = string
  description = "Health check path used by the Application Load Balancer for the backend app"
  default     = "/health"
}
variable "backend_fargate_cpu" {
  type        = number
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units) for the backend app"
  default     = 256
}
variable "backend_fargate_memory" {
  type        = number
  description = "Fargate instance memory to provision (in MiB) for the backend app"
  default     = 512
}
variable "backend_ecr_repository_name" {
  type        = string
  description = "The name of the Elastic Container Repository for our api-backoffice container images"
}
variable "backend_ecr_repository_url" {
  type        = string
  description = "The url of the Elastic Container Repository for our api-backoffice container images"
}
variable "vpc_resource_id" {
  type        = string
  description = "The id of the Virtual Private Cloud resource in this environment"
  default     = ""
}