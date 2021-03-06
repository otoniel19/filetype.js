# filetype.js

> filetype.js and a module to let you get information from a extension
> <br>
> Information from [FileInfo - The File Extensions Database](https://fileinfo.com)

# usage

> filetype.js supports all mimetypes in [mimedb](https://raw.githubusercontent.com/jshttp/mime-db/master/db.json)

# get info by extension or mimetype

```js
const filetype = require("@otoniel19/filetype.js");
filetype.get("js").then(console.log); // by extension
filetype.get("application/javascript"); //by mimetype
```

- output:

```json
{
  "extname": "js",
  "results": [
    {
      "name": "JavaScript File",
      "description": "A JS file is a text file containing JavaScript code that is used to execute JavaScript instructions in webpages. It may include functions that open and close windows, validate form fields, enable rollover images, or create dropdown menus.",
      "mimetype": "application/javascript",
      "category": "web",
      "type": "text",
      "popularity": "[Object]"
    },
    {
      "name": "JScript Executable Script",
      "description": "JS files are referenced by webpages that incorporate JavaScript functions. They are usually imported in the or sections of the HTML. JS files are helpful when the same JavaScript code is used in multiple webpages as they allow the different pages to reference the code in the one external JS file.",
      "mimetype": "application/javascript",
      "category": "executable",
      "type": "unknown",
      "popularity": "[Object]"
    }
  ]
}
```

# search by extension info

> you can search by name or mimetype

```js
const filetype = require("@otoniel19/filetype.js");
filetype.search("js").then(console.log);
```

- output:

```json
{
  "searchBy": "js",
  "results": []
}
```

> the search has too many results.

# cli

- you can run filetype --help to see commands

```sh
$ filetype --help
> Usage: filetype [options] [command]
> filetype view the type of file
>
> Options:
>  -V, --version   output the version number
>  -h, --help      display help for command
>
> Commands:
>  cache           show the cache
>  get <extname>   get the file type info
>  search <name>   search by extensions
>  help [command]  display help for command
```
