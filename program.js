var http = require('http');

function collectData(url, callback) {
  http.get(url, function(response) {
    response.setEncoding('utf8');

    var text = '';
    response.on('data', function(chunk) {
      text += chunk;
    });

    response.on('end', function() {
      callback(text)
    });
  });
}

function printFinalResults() { 
  for (i = 0; i < results.length; i++) {
    console.log(results[i]);
  }
};

var urlsArray = process.argv.slice(2);
var results = [];

function series(url) {
  if(url) {
    collectData(url, function(text) {
      results.push(text);
      return series(urlsArray.shift());
    });
  } else {
    return printFinalResults();
  }
}
series(urlsArray.shift());