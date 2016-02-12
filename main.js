// var apiKey = require("apiKey.js"), api = apiKey.apiKey;
var http        = require('http');
var querystring = require('querystring');
var config      = require('env2')('config.env');

function getDefinition(apiKey, searchedWord, cb) {
  var options = {
    hostname: "api.wordnik.com",
    path: "/v4/word.json/" + searchedWord + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + apiKey,
    method: "GET"
  };

  var req = http.request(options, function(apiRes){
    chunkingFunc(apiRes, function(body){
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
  res.on('error', function(e){
    console.log("errorrrrrrrrrrrrrrrrrrrr" + e.message);
  });
}

module.exports = {
  getDefinition : getDefinition
};

// var body = '';
// var req = http.request(options, function(res) {
//   res.setEncoding('utf8');
//   res.on('data', function(chunk) {
//     body += chunk;
//   });
//   res.on('end', function() {
//     console.log("no more data");
//   });

// });
// console.log(typeof body);
//
// req.write(postData);
// req.end();
//   var req = new XMLHttpRequest();
//   var parsed;
//   var url = "http://api.wordnik.com:80/v4/word.json/" + searchedWord + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + api;
//
// req.onreadystatechange = function() {
//   if(req.readyState === 4 && req.status === 200) {
//     parsed = JSON.parse(req.response);
//   }
// }
//
// req.open("GET", url, false);
// req.send();
//
// return parsed[0].word;
