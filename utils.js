const { log } = require("console");
const https = require("https");

class createError extends Error {
  constructor(name, msg, code) {
    super(msg);
    this.name = name;
    this.code = code;
  }
}

class utils {
  async get(url) {
    var data = "";
    return new Promise((resolve, reject) => {
      https.get(`https://${url}`, (res) => {
        if (res.statusMessage != "OK")
          throw new Error(
            `error ${res.statusCode} extension .${url
              .split("fileinfo.com/extension/")
              .join("")} ${res.statusMessage}`
          );

        res.on("data", (dt) => (data += dt.toString()));
        res.on("end", () => resolve(Object.assign(res, { data: data })));
      });
    });
  }
  normalize(name) {
    if (name == undefined || name == null || name == "n/a") return "unknown";
    else return name;
  }
}

module.exports = new utils();
