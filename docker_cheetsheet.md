Certainly! Here's the content from your image converted into a well-structured markdown format:

---

# Docker Commands Cheat Sheet

## Installation
- Docker Desktop is available for Mac, Linux, and Windows  
[https://docs.docker.com/desktop](https://docs.docker.com/desktop)

- View example projects that use Docker  
[https://github.com/docker/awesome-compose](https://github.com/docker/awesome-compose)

- Check out Docker documentation  
[https://docs.docker.com](https://docs.docker.com)

---

## Images
Docker images are lightweight, standalone, executable packages of software that include everything needed to run an application: code, runtime, system tools, system libraries, and settings.

| Command | Description |
| ------- | ----------- |
| `docker build -t <image_name> .` | Build an Image from a Dockerfile |
| `docker build -t <image_name> . --no-cache` | Build an Image from a Dockerfile without cache |
| `docker images` | List local images |
| `docker rmi <image_name>` | Delete an image |
| `docker image prune` | Remove all unused images |

---

## Docker Hub
Docker Hub is a service provided by Docker for finding and sharing container images with your team.  
Learn more and find images at [Docker Hub](https://hub.docker.com)

| Command | Description |
| ------- | ----------- |
| `docker login -u <username>` | Login into Docker |
| `docker push <username>/<image_name>` | Publish an image to Docker Hub |
| `docker search <image_name>` | Search Docker Hub for an image |
| `docker pull <image_name>` | Pull an image from Docker Hub |

---

## General Commands

| Command | Description |
| ------- | ----------- |
| `docker -d` | Start the docker daemon |
| `docker --help` | Get help with Docker. Can also use `--help` on all subcommands |
| `docker info` | Display system-wide information |

---

## Containers
A container is a runtime instance of a docker image. Containers isolate software from its environment to ensure it runs uniformly despite differences in infrastructure between development and staging.

| Command | Description |
| ------- | ----------- |
| `docker run --name <container_name> <image_name>` | Create and run a container from an image with a custom name |
| `docker run -p <host_port>:<container_port> <image_name>` | Run a container and publish its port(s) to the host |
| `docker run -d <image_name>` | Run a container in the background |
| `docker start|stop <container_name> (or <container-id>)` | Start or stop an existing container |
| `docker rm <container_name>` | Remove a stopped container |
| `docker exec -it <container_name> sh` | Open a shell inside a running container |
| `docker logs -f <container_name>` | Fetch and follow the logs of a container |
| `docker inspect <container_name> (or <container-id>)` | Inspect a running container |
| `docker ps` | List currently running containers |
| `docker ps --all` | List all docker containers (running and stopped) |
| `docker container stats` | View resource usage stats |

---

This markdown format provides clear organization and readability, making it suitable for documentation or quick reference.