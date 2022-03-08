# filetype.js

> filetype is a module for get extension info from the fileinfo.com using node.js

# usage

```js
const log = console.log.bind(this);
var filetype = require("filetype.js");
filetype("js").then(log);
```

- will output:

```json
{
  "name": "js",
  "results": [
    {
      "name": "JavaScript File",
      "description": "A JS file is a text file containing JavaScript code that is used to execute JavaScript instructions in webpages. It may include functions that open and close windows, validate form fields, enable rollover images, or create dropdown menus."
    },
    {
      "name": "JScript Executable Script",
      "description": "JS files are referenced by webpages that incorporate JavaScript functions. They are usually imported in the or sections of the HTML. JS files are helpful when the same JavaScript code is used in multiple webpages as they allow the different pages to reference the code in the one external JS file."
    }
  ]
}
```
