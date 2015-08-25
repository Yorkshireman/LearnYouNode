var mymodule = require('./mymodule');

var filePath = process.argv[2];
var type = process.argv[3];

mymodule(filePath, type, function(err, array) {
  array.forEach(function(file) {
    console.log(file.toString());
  })
});