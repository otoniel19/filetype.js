# filetype.js

> filetype is a module for get extension info from the fileinfo.com using node.js <br>
> Information from [FileInfo - The File Extensions Database](https://fileinfo.com)

# usage

```js
const log = console.log.bind(this);
var filetype = require("@otoniel19/filetype.js");

//all the three methods will return the same res
filetype.get("name", "js").then(log);

filetype.get("url", "https://myurl.as/assets/script.js").then(log);

filetype.get("file", "myfile.js").then(log);
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
      "format": "Text"
    },
    {
      "name": "JScript Executable Script",
      "description": "JS files are referenced by webpages that incorporate JavaScript functions. They are usually imported in the or sections of the HTML. JS files are helpful when the same JavaScript code is used in multiple webpages as they allow the different pages to reference the code in the one external JS file.",
      "mime-type": "application/javascript",
      "img_url": "https://fileinfo.com/img/icons/files/128/default.png",
      "category": "executable",
      "format": "N/A"
    }
  ]
}
```
