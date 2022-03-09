const { spawnSync } = require("child_process");
const { log } = require("console");
const { JSDOM } = require("jsdom");
const { stripHtml } = require("string-strip-html");
const mime = require("mime");
const path = require("path");

async function request(url) {
  const res = await spawnSync(`curl`, [url], {
    shell: true
  }).stdout.toString();
  return res;
}

const filetype = {
  /**
   * @param {String} type the type could be "name" | "url" | "file"
   * @param {String} name the extension name to search
   */
  async get(type = ["name", "url", "file"], name) {
    var extensionResults = [];
    var categorys = [];
    var extension = "";

    switch (type) {
      case "name":
        extension = name;
        break;
      case "file":
        var data = name.split(".").slice(1).join(".");
        extension = data;
        break;
      case "url":
        var data = name.split("https://").slice(1).join("").split("/");
        data = data[data.length - 1].split(".").slice(1).join(".");
        extension = data;
        break;
    }

    if (extension.length == 0 || extension == undefined)
      throw new Error(`the extension name cannot be empty`);

    //request html content
    var get = await request(`https://fileinfo.com/extension/${extension}`);
    //use jsdom for select name description and etc
    var html = new JSDOM(get).window;
    with (html) {
      //check if extension has found
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
            "mime-type":
              mime.getType(extension) != null
                ? mime.getType(extension)
                : "unknown",
            img_url: img,
            category: categorys[idx].split("/filetypes/").join(""),
            format: document.querySelectorAll("a.formatButton")[idx].innerHTML
          });
        }); //extension not found
      } else throw new Error(`extension .${extension} not found`);
    }
    return {
      name: extension,
      source: `https://fileinfo.com/extension/${extension}`,
      results: extensionResults
    };
  }
};

module.exports = filetype;
