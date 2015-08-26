var http = require('http');
var urlsArray = process.argv.slice(2);
var results = [];

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

function series(array) {

  for (i = 0; i < array.length; i++) {
    collectData(array[i], function(text) {
      results.push(text);
    });
  }
  console.log(results); //returns empty!
}

series(urlsArray);

//it’s asynchrony again.  Remember, `results.push(text)` is within the callback that gets passed to `collectData` so the loop simply sets (`array.length`) number of asynchronous processes going, then immediately logs the contents of `results` which won’t have been populated yet.
//yep - but take comfort - this is not an easy problem to solve

// Ben [2:17 PM]
// I’ll give you a clue.  You need to pass your sequencing function (in this case `series`) a callback to call with the final results.

// Ben [2:18 PM]
// Then, on each callback within the iteration, you need to determine if there are any other callbacks still waiting to return.  if not, you can call the final callback.

// Ben [2:21 PM]
// One way to do that is to include the value of `array[i]` as an extra parameter to the callback passed to `collectData`.  That way, when your callback is invoked, you can test to see if you’ve received callbacks for every element in the original array.

// Ben [2:22 PM]
// you may have to read that once or twice...

// Ben [2:25 PM]
// I would advise you to sort out your function and parameter naming as well as the problem is further complicated by cognitive overload