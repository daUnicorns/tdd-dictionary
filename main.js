// var apiKey = require("apiKey.js"), api = apiKey.apiKey;
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
   getDefinition: getDefinition
};
