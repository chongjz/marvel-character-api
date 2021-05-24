import { configure, getLogger } from "log4js";
import { CacheUtilService } from "../core/cache/CacheUtilService";

const CACHE_KEY = "MARVEL_CHARACTER";
const { LOG4JS_PATH } = require("@/config");
configure(LOG4JS_PATH);

export class FindCharacterController {


    public getSingleCharacter(request, response) {
        getLogger("system").info("Invoke Get all character API");
        const id = request.params["id"];
        return Promise.resolve()
            .then(async () => {
                return CacheUtilService.getCacheByKey(CACHE_KEY, id);
            })

            .then((result: any) => {
                if (result == undefined) {
                    getLogger("errors").info("Could not find in cache , id : " + id);
                    return response.sendStatus(404);
                }
                return response.json(result);
            })
            .catch((e) => {
                getLogger("errors").error("Exception when invoke get single character api:", e);
                return response.sendStatus(500);
            });
    }

}
