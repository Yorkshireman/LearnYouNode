var http = require("http");

var httpPath = process.argv[2];

http.get(httpPath, function(response) {
  response.setEncoding('utf8');
  
  var text = '';
  response.on('data', function(chunk) {
    text += chunk;
  });

  response.on('end', function() {
    console.log(text.length);
    console.log(text);
  });
});