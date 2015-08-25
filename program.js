var http = require("http");

var httpPath = process.argv[2];

http.get(httpPath, function(response) {
  response.setEncoding('utf8');
  response.on('data', console.log);
  response.on('error', console.log);
});