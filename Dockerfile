# build stage
## Image 
FROM node:13-alpine3.11 as build-stage

## Working Directory
WORKDIR /app

## Caching
COPY package*.json ./

## Install dependencies
RUN npm install

## Copy project files to the container
COPY . .

## Build dist
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
