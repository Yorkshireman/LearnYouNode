var http = require('http');

function collectData(url, callback) {
  http.get(url, function(response) {
    response.setEncoding('utf8');

    var text = '';
    response.on('data', function(chunk) {
      text += chunk;
    });

    var n = 0;
    response.on('end', function() {
      n++;
      callback(text, n)
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

function series(urlsArray) {
  var numberOfUrls = urlsArray.length;
  var counter = 0;

  collectData(urlsArray[counter], function(text, n) {
    results.push(text);
    if(n === numberOfUrls) {
      return printFinalResults();
    } else {
      counter += 1;
      return series(urlsArray[counter]);
    }
  });

}
series(urlsArray);

// iterator function should iterate through urlsArray
// iterator function needs to wait til all api calls are finished before exiting its loop
// iterator function's callback

// OR series function's needs to not be a loop, but its callback function could cause the series to be called again UNLESS the 'count' has be reached. Count can be set by urlsArray's length. But then things won't be returned in order? Ah, but you could make the collectData reduce the count by one. Similar to present solution but means series is not dependent on urlsArray changing state - urlsArray's state could remain the same.