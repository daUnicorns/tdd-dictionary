/////////////////////// CREATE THE ARRAY OF MATCHING WORDS //////////////////////

var fs = require('fs');
require('env2')('config.env');

function printApi() {
   return process.env.DB_API;
}

function wordFinder(value) {
  var words = fs.readFileSync('words.txt');
  var ArrayOfWords = words.toString().toLowerCase().split('\n');
  return ArrayOfWords.indexOf(value.toLowerCase());
}

function arrayMaker(value) {
   var placeInArray = wordFinder(value);
   var array = [];
   for (var counter = placeInArray; counter < placeInArray+5; counter++) {
     if (ArrayOfWords[counter].match(/value/gi).length > 0) {
       array.push(ArrayOfWords[counter]);
     }
   }
   return array;
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
         var definition = body[0].text;
         return cb(definition);
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
   wordImporter: wordImporter,
   arrayMaker: arrayMaker,
   printApi: printApi
   getDefinition: getDefinition
};
