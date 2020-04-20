# build stage
## Image 
FROM node:13-alpine3.11 as build-stage

## Working Directory
WORKDIR /app

## Caching
COPY package*.json ./

## Install dependencies
RUN npm ci

## Copy project files to the container
COPY . .

## Build dist
## Add these in case of emergency !
# ENV VUE_APP_API_HOST=https://spotify-elghalaba.me
# ENV VUE_APP_API_PORT=443
RUN npm run build

# production stage
## Use latest stable nginx-alpine image
FROM nginx:stable-alpine as production-stage

## Copy dist from build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

## Allow connections to port 80 
EXPOSE 80

## Run nginx server
CMD ["nginx", "-g", "daemon off;"]
