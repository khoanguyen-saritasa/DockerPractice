# Exercise 1:  Simple backend into Docker

## Prerequisite
- To run this app on your local computer, it is required to install Docker and Docker compose.
- When Docker is installed, run `dockerd` to start Docker Daemon.
- After starting Docker, cd to the folder of project and we are good to go.
- If permission is required, add `sudo` before the command.

## How to run
### Option 1: Using Docker compose.
- With this option, we just simply need to add this command to the terminal `docker compose up -d`.

### Option 2: Using Docker run.
- With this option, we will add this command to the terminal `docker build -t node-js-demo .` and then run `docker run -dp 8000:8000 node-js-demo`

## Port
After finishing building the image and container, the application will run on `localhost:8000`.
