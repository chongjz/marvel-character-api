import { Md5 } from "ts-md5";
import { Api } from "@/constant/Api";
const { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY, MARVEL_API_KEY, MARVEL_DOMAIN } = require("@/config");


export namespace CustomMarvelUtil {

    export function buildMarvelUrl(path: string, id: String, queryParameter = {}) {
        const md5 = new Md5();
        const ts = new Date().getTime().toString();
        const hash = md5.appendStr(ts).appendStr(MARVEL_PRIVATE_KEY).appendStr(MARVEL_PUBLIC_KEY).end();

        const param = {
            ts: ts,
            apikey: MARVEL_API_KEY,
            hash: hash
        };
        path = MARVEL_DOMAIN.concat(Api.MARVEL.API_PATH, path, id, "?");

        for (const [key, value] of Object.entries({
            ...param,
            ...queryParameter
        })) {
            path = path.concat("&", key, "=", value);
        }
        return path;
    }

}