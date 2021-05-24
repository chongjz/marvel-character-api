require("dotenv").config({ path: "./config/.env" });

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    LOG4JS_PATH: process.env.LOG4JS_PATH,
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
    MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
    MARVEL_API_KEY: process.env.MARVEL_API_KEY,
    MARVEL_DOMAIN: process.env.MARVEL_DOMAIN,
    SWAGGER_API_DOC: process.env.SWAGGER_API_DOC
};

