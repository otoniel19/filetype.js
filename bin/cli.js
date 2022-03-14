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
      head: [`name`, `size`]
    });
    Object.keys(cacheJson).forEach((o) => {
      table.push([o, o.length]);
    });
    log(table.toString());
  });

cli
  .command("get <extname>")
  .option("-p,--parse", `returns a parsed json`, false)
  .description("get the file type info")
  .action(async (ext, { parse }) => {
    var { get } = require("../index");
    try {
      log(!parse ? JSON.stringify(await get(ext)) : await get(ext));
    } catch (e) {
      log("error".red, e.message);
      process.exit();
    }
  });

cli
  .command(`search <name>`)
  .option("-p,--parse", `returns a parsed json`)
  .description(`search by extensions`)
  .action(async (name, { parse }) => {
    var { search } = require("../index");
    try {
      log(!parse ? JSON.stringify(await search(name)) : await search(name));
    } catch (e) {
      log(`error`.red, e.message);
      process.exit();
    }
  });

cli.parse(process.argv);
