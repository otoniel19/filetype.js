const { log } = require("console");
const https = require("https");
const error = require("./error");
require("colors");

class utils {
  async get(url) {
    var data = "";
    return new Promise((resolve, reject) => {
      var req = https.get(`https://${url}`, (res) => {
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
      req.on("error", (e) => {
        console.log(`error`.red, e.message);
      });
    });
  }
  normalize(name) {
    if (
      name == undefined ||
      name == null ||
      name == "n/a" ||
      name == "popularity"
    )
      return "unknown";
    else return name;
  }
  getRate(n) {
    if (n >= 1.0 && n < 2.0) return "rare";
    else if (n >= 2.0 && n < 3.0) return "uncommon";
    else if (n >= 3.0 && n < 4.0) return "average";
    else if (n >= 4.0 && n <= 5.0) return "common";
    else if (n >= 5.0) return "very common";
  }
}

module.exports = new utils();
