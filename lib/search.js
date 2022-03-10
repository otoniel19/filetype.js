const { get } = require("https");
var log = console.log.bind(this);
const { stripHtml } = require("string-strip-html");

function src(name, cb) {
  get("https://fileinfo.com/search?sfield=description&query=" + name, (res) => {
    var full = "";
    res.on("data", (data) => {
      full += data.toString();
    });
    res.on("end", () => cb(full));
  });
}

module.exports = async (term, cb) => {
  var result = [];
  src(term, async (n) => {
    var d = await n;
    var jsdom = require("jsdom");
    var dom = await new jsdom.JSDOM(d).window;
    with (dom) {
      var names = await document.querySelectorAll("td.extcol>a");
      var descs = await document.querySelectorAll("td.stretchcol");
      await names.forEach((o, idx) => {
        result.push({
          name: o.innerHTML.slice(1).toLowerCase(),
          type: stripHtml(descs[idx].innerHTML.toLowerCase()).result
        });
      });
      await cb({
        search: term,
        source: `https://fileinfo.com/search?sfield=description&query=${term}`,
        results: result
      });
    }
  });
};
