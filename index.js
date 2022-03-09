const { spawnSync } = require("child_process");
const { log } = require("console");
const { JSDOM } = require("jsdom");
const { stripHtml } = require("string-strip-html");

/**
 * @param {String} extension the extension name to search
 */
async function filetype(extension) {
  var extensionResults = [];
  var categorys = [];

  if (extension.startsWith("."))
    throw new Error(`the extension cannot start with .`);

  if (extension.length == 0 || extension == undefined)
    throw new Error(`the extension name cannot be empty`);

  const get = await spawnSync(
    `curl`,
    [`https://fileinfo.com/extension/${extension}`],
    {
      shell: true
    }
  ).stdout.toString();

  var html = new JSDOM(get).window;
  with (html) {
    var extensionFound = !document
      .querySelector("title")
      .innerHTML.includes("Not Found");

    if (extensionFound) {
      //the name
      const extResults = document.querySelectorAll("h2.title");

      extResults.forEach((name, idx) => {
        //pick img url
        var img = document
          .querySelectorAll("div.entryIcon")
          [idx].getAttribute("data-bg");
        //select category
        document
          .querySelectorAll("td>a")
          .forEach((o) => categorys.push(o.getAttribute("href")));

        //remove whitespaces from categorys
        categorys = categorys.filter((str) => /\S/.test(str));

        extensionResults.push({
          name: name.innerHTML,
          description: stripHtml(
            document.querySelectorAll("div.infoBox>p")[idx].innerHTML
          ).result,
          img_url: img,
          category: categorys[idx].split("/filetypes/").join("")
        });
      });
    } else throw new Error(`extension named ${extension} not found`);
  }

  return { name: extension, results: extensionResults };
}

filetype("js").then((o) => {
  log(o);
});

module.exports = filetype;
