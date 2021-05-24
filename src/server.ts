import { configure, getLogger } from "log4js";
import "module-alias/register";
import app from "@/app";
const { LOG4JS_PATH, PORT } = require("@/config");
configure(LOG4JS_PATH);

const logger = getLogger("startup");

logger.info("Startup Server");


const server = app.listen(PORT, () => {
    logger.trace("Starting server with port" + PORT);

    if (PORT == undefined) {
        logger.error("Server port not set");
        throw "Server port not set";
    }

    logger.info(`server is listening on ${PORT}`);
});



module.exports = server;