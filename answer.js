/////////////////////// CREATE THE ARRAY OF MATCHING WORDS //////////////////////


var fs = require('fs');
require('env2')('config.env');

function printApi() {
   return process.env.DB_API;
}

  var words = fs.readFileSync('words.txt');
  var ArrayOfWordsLowerCase = words.toString().toLowerCase().split('\n');
  var ArrayOfWords = words.toString().split('\n');


function arrayMaker(value) {
  var result;
   var arrayOfMatches = [];
   var indexes = [];
   ArrayOfWordsLowerCase.forEach(function(currentvalue, index, array){
     if(currentvalue.indexOf(value.toLowerCase()) === 0) {indexes.push(index);}
   });
     if (indexes.length >= 5) { result = indexes.slice(0, 5); }
     else if (indexes.length === 0) {result = "D0 N0T C0MPUTE"}
     else { result = indexes; }


  for(var i = 0; i < result.length; i++){
     arrayOfMatches.push(ArrayOfWords[result[i]]);
  }

  //  var placeInArray = ArrayOfWordsLowerCase.indexOf(value.toLowerCase());
   //
  //  var array = [];
  //  var reg1 = new RegExp( '^' + value.toLowerCase() + '$');
  //  for (var counter = placeInArray; counter < placeInArray+5; counter++) {
  //    if (ArrayOfWordsLowerCase[counter].indexOf(value.toLowerCase())>-1) {
  //      array.push(ArrayOfWords[counter]);
  //    }
  //  }
   return arrayOfMatches;
}

/// generate random value
function randomWord(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

////////////////////// GRAB THE DEFINITION OF A WORD ////////////////////////////

var http = require('http');
var querystring = require('querystring');
var config = require('env2')('config.env');

function getDefinition(apiKey, searchedWord, cb) {
   var options = {
      hostname: "api.wordnik.com",
      path: "/v4/word.json/" + searchedWord + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + apiKey,
      method: "GET"
   };
   var req = http.request(options, function(apiRes) {
      chunkingFunc(apiRes, function(body) {
        if (body[0] == undefined) {
          return cb("SORRY, THERE IS INTERFERENCE WITH THE MASTER SPACESHIP.TRY AGAIN");
        } else {
          var definition = body[0].text;
          return cb(definition);
        }
      });
   });
   req.end();
}

function chunkingFunc(res, callback) {
   var body = '';
   res.on('data', function(chunk) {
      body += chunk;
   });
   res.on('end', function() {
      var parsedBody = JSON.parse(body);
      return callback(parsedBody);
   });
   res.on('error', function(e) {
      console.log("errorrrrrrrrrrrrrrrrrrrr" + e.message);
   });
}


module.exports = {
   arrayMaker: arrayMaker,
   printApi: printApi,
   getDefinition: getDefinition,
   randomWord : randomWord
};
