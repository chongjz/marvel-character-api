# Marvel Character API

This API is built in Nodejs.

There are 2 APIs in this project:

1. /characters - To retrieve all Marvel's character from Marvel's API/ and return ids in response.
2. /characters/{id} - To retrieve single Marvel's character from cache and return id, name, and description.

## Requirement

1. Node 8 and above.

## Install dependencies

1. Open cmd in project folder.
2. enter command "npm install"

### Configure environment in config file

1. Configure Marvel's API public key and private key in config file.
    a. MARVEL_PUBLIC_KEY= **Public Key**
    b. MARVEL_PRIVATE_KEY=**Private Key**
    c. MARVEL_API_KEY=**API Key**

*Key will shared seperately

### Logging

1. Configure log folder location in "config/log4js.json".

### Run application without nodemon

1. Open cmd in project folder.
2. Run "npm run build" to build project.
3. Run "npm run serve" to bring up server.
4. Open swagger in browser. (http://localhost:8080/api-docs/)

### Run application with nodemon

1. Open cmd in project folder.
2. Run "npm run watch" to bring up server.
3. Open swagger in browser. (http://localhost:8080/api-docs/)

### Run unit test

1. Open cmd in project folder.
2. Run "npm run test" to execute all unit test.
