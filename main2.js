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
   var placeInArray = ArrayOfWordsLowerCase.indexOf(value.toLowerCase());
   var array = [];
   for (var counter = placeInArray; counter < placeInArray+5; counter++) {
     if (ArrayOfWordsLowerCase[counter].indexOf(value.toLowerCase())>-1) {
       array.push(ArrayOfWords[counter]);
     }
   }
   return array;
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
   arrayMaker: arrayMaker,
   printApi: printApi,
   getDefinition: getDefinition,
   randomWord : randomWord
};
