const { log } = require("console");
const stormdb = require("stormdb");
const db = new stormdb(
  new stormdb.localFileEngine(__dirname + "/cache.json", {
    serialize: (data) => JSON.stringify(data, null, "\t"),
    deserialize: (data) => JSON.parse(data)
  })
);

exports.save = (json) => {
  db.set(json.name, json.results);
  db.save();
};

exports.get = (key) => {
  return db.get(key).value();
};
