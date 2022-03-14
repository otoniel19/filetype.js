const utils = require("./lib/utils");
const { JSDOM } = require("jsdom");
const mime = require("mime");
const mimedb = require("mime-db");
const { stripHtml } = require("string-strip-html");
const error = require("./lib/error");
const cache = require("./cache/cache");

class filetype {
  /**
   * @param {String} name the name to check for extension or mimetype
   * @returns {Promise<any>}
   */
  async get(name) {
    var res = [];
    if (name == "" || name == undefined)
      throw new Error(`the name cannot be empty or undefined`);

    name = utils.parse(name);

    //check if exists on cache
    if (cache.get(name) !== undefined)
      return { extname: name, results: cache.get(name) };

    var { data } = await utils.get(`fileinfo.com/extension/${name}`);

    var html = new JSDOM(data).window;
    try {
      var tmp = [];
      html.document
        .querySelectorAll("h2.title")
        .forEach((o) => tmp.push(o.innerHTML));
    } catch (e) {
      new error({
        name: "ContentError",
        message: "the request did not load the html correctly",
        code: "HTML_NOT_LOADED"
      });
    }
    //the ext names
    var titles = html.document.querySelectorAll("h2.title");

    var categorys = [];

    titles.forEach((o, idx) => {
      //select category
      html.document
        .querySelectorAll("td>a")
        .forEach((o) => categorys.push(o.getAttribute("href")));

      //remove whitespaces from categorys
      categorys = categorys.filter((str) => /\S/.test(str));

      res.push({
        name: o.innerHTML,
        //ext descriptions
        description: stripHtml(
          html.document.querySelectorAll("div.infoBox>p")[idx].innerHTML
        ).result,
        //mimetype of ext
        mimetype: utils.normalize(mime.getType(name)),
        //extension category
        category: utils.normalize(
          categorys[idx].split("/filetypes/").join("").toLowerCase()
        ),
        type: utils.normalize(
          html.document
            .querySelectorAll("a.formatButton")
            [idx].innerHTML.toLowerCase()
        ),
        popularity: {
          votes: Number(
            html.document.querySelectorAll("span.stats>span.voteavg")[idx]
              .innerHTML
          ),
          usage: utils.getRate(
            Number(
              html.document.querySelectorAll("span.stats>span.voteavg")[idx]
                .innerHTML
            )
          )
        }
      });
    });
    cache.get(name) == undefined
      ? cache.save({ name: name, results: res })
      : "";
    return { extname: `${name}`, results: res };
  }
  /**
   * @param {String} srcName the name to search
   * @returns {Promise<any>}
   */
  async search(srcName) {
    var isMime =
      srcName in mimedb
        ? (srcName = mime.getExtension(srcName))
        : (srcName = srcName);

    var res = await utils.get(
      `fileinfo.com/search?sfield=description&query=${srcName}`
    );

    var dom = new JSDOM(res.data).window;
    var resArray = [];
    var titles = dom.document.querySelectorAll("td.extcol>a");
    titles.forEach((o, idx) => {
      resArray.push({
        name: o.innerHTML.toLowerCase().slice(1),
        description: stripHtml(
          dom.document
            .querySelectorAll("td.stretchcol")
            [idx].innerHTML.toLowerCase()
        ).result
      });
    });
    return { searchBy: srcName, results: resArray };
  }
}

module.exports = new filetype();
