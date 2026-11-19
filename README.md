# TaskAPI – beginner DevOps project

Node/Express to-do API → tests → Docker → GitHub Actions → AWS EC2.

## Run locally
    npm install
    npm test
    npm start          # http://localhost:3000/health

## Docker
    docker build -t taskapi .
    docker run -p 3000:3000 taskapi

## Endpoints
GET /health, GET /tasks, POST /tasks {"title":"..."}, PUT /tasks/:id, DELETE /tasks/:id

## CI/CD setup (GitHub repo > Settings > Secrets > Actions)
| Secret | Value |
|---|---|
| DOCKERHUB_USERNAME | your Docker Hub username |
| DOCKERHUB_TOKEN | Docker Hub access token |
| EC2_HOST | EC2 public IP |
| EC2_USER | ubuntu |
| EC2_SSH_KEY | full contents of the .pem key |

EC2 prep (Ubuntu): `sudo apt update && sudo apt install -y docker.io && sudo usermod -aG docker ubuntu`; open ports 22 and 80 in the security group.
