const https = require("https");

export namespace HttpUtil {

  export function call(url: string) {
    return new Promise((resolve, reject) => {
      https.get(url, res => {
        const data = [];
        res.on("data", chunk => {
          data.push(chunk);
        });
        res.on("end", () => {
          const resp = JSON.parse(Buffer.concat(data).toString());
          resolve(resp);
        });
      }).on("error", err => {
        reject(err);
      });
    });
  }

}