# filetype.js

> filetype is a module for get extension info from the fileinfo.com using node.js <br>
> Information from [FileInfo - The File Extensions Database](https://fileinfo.com)

# usage

- get by extension name

```js
const log = console.log.bind(this);
var filetype = require("@otoniel19/filetype.js");

filetype.get("js").then(log);

filetype.get("https://myurl.as/assets/script.js").then(log);
```

- will output:

```json
{
  "name": "js",
  "source": "https://fileinfo.com/extension/js",
  "results": [
    {
      "name": "JavaScript File",
      "description": "A JS file is a text file containing JavaScript code that is used to execute JavaScript instructions in webpages. It may include functions that open and close windows, validate form fields, enable rollover images, or create dropdown menus.",
      "mime-type": "application/javascript",
      "img_url": "https://fileinfo.com/img/icons/files/128/js-45.png",
      "category": "web",
      "type": "text"
    },
    {
      "name": "JScript Executable Script",
      "description": "JS files are referenced by webpages that incorporate JavaScript functions. They are usually imported in the or sections of the HTML. JS files are helpful when the same JavaScript code is used in multiple webpages as they allow the different pages to reference the code in the one external JS file.",
      "mime-type": "application/javascript",
      "img_url": "https://fileinfo.com/img/icons/files/128/default.png",
      "category": "executable",
      "type": "unknown"
    }
  ]
}
```

- get by mimetype

> this method supports all mimetypes of [mime-db](https://raw.githubusercontent.com/jshttp/mime-db/master/db.json)

```js
const log = console.log.bind(this);
var filetype = require("@otoniel19/filetype.js");

filetype.getByMime("application/javascript").then(log);
```

- will output:

```json
{
  "name": "js",
  "source": "https://fileinfo.com/extension/js",
  "results": [
    {
      "name": "JavaScript File",
      "description": "A JS file is a text file containing JavaScript code that is used to execute JavaScript instructions in webpages. It may include functions that open and close windows, validate form fields, enable rollover images, or create dropdown menus.",
      "mime-type": "application/javascript",
      "img_url": "https://fileinfo.com/img/icons/files/128/js-45.png",
      "category": "web",
      "type": "text"
    },
    {
      "name": "JScript Executable Script",
      "description": "JS files are referenced by webpages that incorporate JavaScript functions. They are usually imported in the or sections of the HTML. JS files are helpful when the same JavaScript code is used in multiple webpages as they allow the different pages to reference the code in the one external JS file.",
      "mime-type": "application/javascript",
      "img_url": "https://fileinfo.com/img/icons/files/128/default.png",
      "category": "executable",
      "type": "unknown"
    }
  ]
}
```

- search by results

```js
const filetype = require("@otoniel19/filetype.js");
filetype.searchBy("js").then(console.log);
```

- will output:

```js
{
  search: "js",
  source: "https://fileinfo.com/search?sfield=description&query=js",
  results: [...results]
}
```

# the cli

> the cli has the get getByMimen and searchBy methods but you specify the output json or yaml
> <br>
> run filetypejs --help to view commands
