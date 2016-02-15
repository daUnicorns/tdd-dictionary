var http = require("http");
var port = process.env.PORT || 8080;
var fs = require('fs');
var stylesheet = fs.readFileSync('./style.css');
var index = fs.readFileSync('./index.html');
var words = fs.readFileSync('./words.txt');
var qs = require('querystring');
var main2 = require('./main2.js');
var main = fs.readFileSync("./main.js");
require('env2')('config.env');

var apiKey = process.env.DB_API;
// var main = require("main.js");

function handler(request, response){
  var url = request.url;
  console.log(url);
  if (url.match('/search')) {
    // var body = '';
    // request.on('data', function(chunk) {
    //   body += chunk;
    // });
    // request.on('end', function() {

      var data = url.split("/search")[1];
      console.log("DATAAAAAA", data);
      var resultArray = main2.arrayMaker(data);
      var result;
      main2.getDefinition(apiKey, data, function(word) {
         result = word;
      });

      setTimeout(function(){
        var finalResult = resultArray.join("*") + "*" + result;
        response.end(finalResult);
      }, 1000);
    // });
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
  fs.readFile(__dirname + url, function(error, file){
  if (error){
    console.log(error);
    response.end();
  } else {
    var ext = url.split('.')[1];
    response.writeHead(200, {'Content-Type' : 'text/' + ext});
    response.end(file);
  }
});
  }
}



http.createServer(handler).listen(port);
console.log("Server is listening");

module.exports = {
   handler: handler
};
