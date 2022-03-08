const { get } = require("https");
const { JSDOM } = require("jsdom");

/**
 * @param {String} extension the extension name to search
 * @param {Function} callback the callback to get results
 * @returns {void}
 */
function filetype(extension, callback) {
  var extensionResults = [];

  if (extension.startsWith("."))
    throw new Error(`the extension cannot start with .`);

  if (typeof callback != "function")
    throw new Error(`the callback must be a function`);

  get(`https://fileinfo.com/extension/${extension}`, (res) => {
    if (res.statusMessage != "OK")
      throw new Error(`extension ${extension} not found`);

    res.on("data", (data) => {
      var ch = data.toString();
      var html = new JSDOM(ch);
      var titles = html.window.document.querySelectorAll("h2.title");
      titles.forEach((l) => extensionResults.push(l.innerHTML));
    });
    res.on("close", () => {
      var obj = {
        name: extension,
        results: extensionResults
      };
      callback(obj);
    });
  });
}

module.exports = filetype;
