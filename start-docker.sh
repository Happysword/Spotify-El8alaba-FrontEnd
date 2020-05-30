# Stop and Delete containers
docker container stop front-prod
docker container rm front-prod

# Stop back container to save ram for build process
docker container stop back-prod

# Delete images
docker image rm front

# Build image
docker image build -t front .

# Run container
docker container run -d \
	 --name front-prod \
	 --restart on-failure \
	 --mount type=bind,src="$(pwd)"/default.conf,target=/etc/nginx/conf.d/default.conf \
	 --network sp8 \
	 -p 4000:80 \
	front:latest

# Start back container again
docker container start back-prod