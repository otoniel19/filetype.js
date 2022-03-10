#!/usr/bin/env node
const cli = require("commander").program;
const { log } = require("console");
const filetype = require("../index");
require("colors");

cli
  .command("get <extension>")
  .description("get the extension info")
  .requiredOption(
    "-t,--type <type>",
    "the data type to output types: json | yaml"
  )
  .action((ext, { type }) => {
    var types = ["json", "yaml"];
    if (types.indexOf(type) != -1) {
      var select = types[types.indexOf(type)];
      start(select, ext, "get");
    } else cli.error("error".red + ` type ${type} not supported`);
  });
cli
  .command("getByMime <mime-type>")
  .description("get the extension info")
  .requiredOption(
    "-t,--type <type>",
    "the data type to output types: json | yaml"
  )
  .action((ext, { type }) => {
    var types = ["json", "yaml"];
    if (types.indexOf(type) != -1) {
      var select = types[types.indexOf(type)];
      start(select, ext, "getByMime");
    } else cli.error("error".red + ` type ${type} not supported`);
  });

cli
  .command("searchBy <term>")
  .description("search by extensions")
  .requiredOption(
    "-t,--type <type>",
    "the data type to output types: json | yaml"
  )
  .action((ext, { type }) => {
    var types = ["json", "yaml"];
    if (types.indexOf(type) != -1) {
      var select = types[types.indexOf(type)];
      start(select, ext, "searchBy");
    } else cli.error("error".red + ` type ${type} not supported`);
  });

async function start(type, ext, method) {
  try {
    var desc = await filetype[method](ext);
    type == "json" ? log(desc) : log(require("yaml").stringify(desc));
  } catch (e) {
    cli.error("error".red + ` ${e.message}`);
  }
}

cli.parse(process.argv);
