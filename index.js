const { spawnSync } = require("child_process");
const { log } = require("console");
const { JSDOM } = require("jsdom");
const { stripHtml } = require("string-strip-html");

/**
 * @param {String} extension the extension name to search
 */
async function filetype(extension) {
  var extensionResults = [];

  if (extension.startsWith("."))
    throw new Error(`the extension cannot start with .`);

  if (extension.length == 0 || extension == undefined)
    throw new Error(`extension cannot be empty`);

  const get = await spawnSync(
    `curl`,
    [`https://fileinfo.com/extension/${extension}`],
    {
      shell: true
    }
  ).stdout.toString();
  var html = new JSDOM(get).window;
  var extensionFound = !html.document
    .querySelector("title")
    .innerHTML.includes("Not Found");
  if (extensionFound) {
    const extResults = html.document.querySelectorAll("h2.title");
    extResults.forEach((name, idx) => {
      extensionResults.push({
        name: name.innerHTML,
        description: stripHtml(
          html.document.querySelectorAll("div.infoBox>p")[idx].innerHTML
        ).result
      });
    });
  } else throw new Error(`extension ${extension} not found`);

  return { name: extension, results: extensionResults };
}

filetype("js").then(log);

module.exports = filetype;
