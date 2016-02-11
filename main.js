// var apiKey = require("apiKey.js"), api = apiKey.apiKey;
var http = require('http');
var querystring = require('querystring');
var config = require('env2')('config.env');

var postData = querystring.stringify({
  'msg': 'hello world'
});

function getAPIobject(api, searchedWord) {
  console.log(typeof api);
  var options = {
    hostname: "api.wordnik.com",
    path: "/v4/word.json/" + searchedWord + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + api,
    method: "GET"
  };
  callback = function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      console.log(JSON.parse(body)[0].word);
    });
  };
  http.request(options, callback).end();

};

getAPIobject(process.env.DB_API, "book");



module.exports = {
  getAPIobject : getAPIobject
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
