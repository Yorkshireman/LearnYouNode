var fs = require("fs");
var path = require("path");

module.exports = function(filePath, type, callback) {
  fs.readdir(filePath, function(err, files) {
    if (err) return callback(err);

    var array = [];
    for(var i = 0; i < files.length; i++) {
      var file = files[i];
      if(path.extname(file) === "." + type) {
        array.push(file);
      }
    }
    callback(null, array);
  })
};