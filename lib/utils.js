const { log } = require("console");
const https = require("https");
const error = require("./error");

class utils {
  async get(url) {
    var data = "";
    return new Promise((resolve, reject) => {
      https.get(`https://${url}`, (res) => {
        if (res.statusMessage != "OK")
          new error({
            name: "Request Error",
            message: `cannot send a request to ${url}`,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
          });

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
