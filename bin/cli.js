#!/usr/bin/env node
const cli = require("commander").program;
const cache = require("../cache/cache");
var cacheJson = require("../cache/cache.json");
var cliTable = require("cli-table3");
const { log } = require("console");
require("colors");

cli
  .name("filetype")
  .description(`filetype view the type of file`)
  .version(require("../package.json").version);

cli
  .command("cache")
  .description("show the cache")
  .action(() => {
    var table = new cliTable({
      head: [`extname`, `resultsSize`]
    });
    Object.keys(cacheJson).forEach((o) => {
      table.push([o, o.length]);
    });
    log(table.toString());
  });

cli
  .command("get <extname>")
  .description("get the file type info")
  .action(async (ext) => {
    var { get } = require("../index");
    try {
      log(JSON.stringify(await get(ext)));
    } catch (e) {
      log("error".red, e.message);
      process.exit();
    }
  });

cli
  .command(`search <name>`)
  .description(`search by extensions`)
  .action(async (name) => {
    var { search } = require("../index");
    try {
      log(JSON.stringify(await search(name)));
    } catch (e) {
      log(`error`.red, e.message);
      process.exit();
    }
  });

cli.parse(process.argv);
