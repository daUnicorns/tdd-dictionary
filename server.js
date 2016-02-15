var http = require("http");
var port = process.env.PORT || 8080;
var fs = require('fs');
var stylesheet = fs.readFileSync('./style.css');
var index = fs.readFileSync('./index.html');
var words = fs.readFileSync('./words.txt');
var qs = require('querystring');
var main2 = require('./main2.js');
require('env2')('config.env');

var apiKey = process.env.DB_API;
// var main = require("main.js");

function handler(request, response){
  var url = request.url;
  console.log(url);
  if(url === '/style.css'){
    response.writeHead(200, {"Content-Type": "text/css"});
    response.end(stylesheet);
    console.log('style.css has been sent');
  }
  else if (request.method === 'POST' && request.url === '/') {
    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      var data = qs.parse(body);

      response.writeHead(200);
      var dataObj = data.search;
      var resultArray = main2.arrayMaker(dataObj);
      var result;
      var resultDefinition = main2.getDefinition(apiKey, dataObj, function(word) {
         result = word;
      });
      console.log("here is the result array ", resultArray);
      setTimeout(function(){
        console.log("here is the result defintion", result);
        response.end(result);
      }, 1000);
    });
  }
  else if(url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index);
  }
  else if(url === '/words.txt') {
    response.writeHead(200);
    console.log(words.toString());
    response.end(words);
  }
else {
    response.writeHead(404);
    response.end();
  }
}

http.createServer(handler).listen(port);
console.log("Server is listening");

module.exports = {
   handler: handler
};
