# Stop and Delete containers
docker container stop front-prod
docker container rm front-prod

# Delete images
docker image rm front

# Build image
docker image build -t front .

# Run container
docker container run -d \
	 --name front-prod \
	 --restart on-failure \
	 --network sp8 \
	 -p 4000:80 \
	front:latest
