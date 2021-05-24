import { Character } from "@/bean/Character";
import { Api } from "@/constant/Api";
import { CustomMarvelUtil } from "@/core/util/CustomMarvelUtil";
import { HttpUtil } from "@/core/util/HttpUtil";
import { configure, getLogger } from "log4js";
import { CacheUtilService } from "../core/cache/CacheUtilService";

const CACHE_KEY = "MARVEL_CHARACTER";
const { LOG4JS_PATH } = require("@/config");
configure(LOG4JS_PATH);
const MARVEL_API_LIMIT = 100;
export class CharacterCountroller {

    public getCharacters(response) {
        getLogger("system").info("Invoke Get all character API");
        return Promise.resolve()
            .then(async () => {
                let resp;
                if ((resp = CacheUtilService.getCache(CACHE_KEY)) == undefined) {
                    resp = await this.refreshCache();
                }
                return resp;
            })
            .then((resp: any) => {
                return response.send(resp ? Object.keys(resp) : {});
            })
            .catch((e) => {
                getLogger("error").error("Exception when invoke get all character api:", e);
                return response.sendStatus(500);
            });
    }

    private storeCache(records: any[]) {
        const data = {};
        records.forEach(record => {
            data[record["id"]] = new Character().assign(record);
        });
        CacheUtilService.setCache(CACHE_KEY, data);
        return data;
    }

    private async retrieveListFromMarvel() {
        try {
            let characterList = [];
            getLogger("system").info("Invoke Marvel API");
            const resp = await HttpUtil.call(CustomMarvelUtil.buildMarvelUrl(Api.MARVEL.GET_ALL_CHARACTER, "", {
                limit: MARVEL_API_LIMIT
            }));
            if (resp["code"] == "200" && resp["data"]) {
                characterList = characterList.concat(resp["data"].results);
                const total = resp["data"]["total"];
                if (total > MARVEL_API_LIMIT) {
                    const pagination = Math.ceil(total / MARVEL_API_LIMIT);
                    const apiCall = [];
                    for (let i = 1; i <= pagination; i++) {
                        apiCall.push(HttpUtil.call(CustomMarvelUtil.buildMarvelUrl(Api.MARVEL.GET_ALL_CHARACTER, "", {
                            limit: MARVEL_API_LIMIT,
                            offset: MARVEL_API_LIMIT * i
                        })));
                    }
                    characterList = await Promise.all(apiCall).then((values) => {
                        values.map(value => {
                            if (value["code"] == "200" && value["data"]) {
                                characterList = characterList.concat(value["data"].results);
                            }
                        });
                        return characterList;
                    });
                }
            }
            return characterList;
        } catch (e) {
            getLogger("error").error("Exception when invoke get marvel's character api:", e);
            return undefined;
        }
    }


    public async refreshCache() {
        getLogger("system").info("Refresh Marvel Cache");
        try {
            const apiResult = await this.retrieveListFromMarvel();
            if (apiResult !== undefined) {
                return this.storeCache(apiResult);
            }
            return undefined;
        } catch (e) {
            getLogger("error").error("Exception when invoke get all character api:", e);
        }
    }
}
