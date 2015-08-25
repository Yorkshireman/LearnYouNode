var fs = require("fs");
var path = require("path")

var filePath = process.argv[2];
var type = process.argv[3];


fs.readdir(filePath, function(err, files) {
	if (err) throw err;
	for(var i = 0; i < files.length; i++) {
		var file = files[i];
		if(path.extname(file) === "." + type) {
			console.log(file);
		}
	}
});