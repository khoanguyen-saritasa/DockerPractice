# sudo docker compose down --volumes
# sudo docker rmi -f ex2-ui ex2-api postgres
# sudo docker compose build --no-cache
# sudo docker compose up --renew-anon-volumes

sudo docker compose down --volumes
sudo docker rmi -f ex2-api
sudo docker compose build --no-cache
sudo docker compose up --renew-anon-volumes