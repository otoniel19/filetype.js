# filetype.js

> filetype is a module for get extension info from the fileinfo.com using node.js

# usage

````js
 const log = console.log.bind(this)
 var filetype = require("filetype.js")
 filetype("js",(obj)=>{
  log(obj.name) // js
  log(obj.results) // ["JavaScript File","JScript Executable Script"]
 })
```
````
