# Spotify-el8alaba

## Prerequisites
Install `nodejs`. Use this [installation guide](https://nodejs.org/en/download/package-manager/) according to your OS

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Configuring env. variables
The project contains `.env` as a fallback, `.env.development` for `NODE_ENV=development` and `.env.production` for `NODE_ENV=production`. All of them has the following env vars :-
    
1. `VUE_APP_API_HOST` : Host of the REST API to use.
2. `VUE_APP_API_PORT` : Port of the REST API on that host.

### Run your unit tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
### Runs Unit Tests and Creates the Coverage Reports
```
npx jest --coverage
```
### Functional Documentation
```
./node_modules/.bin/jsdoc --readme README.md -r src -d doc
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
