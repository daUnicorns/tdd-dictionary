var http = require("http");
var port = process.env.PORT || 8080;
var fs = require('fs');
var stylesheet = fs.readFileSync('./style.css');
var index = fs.readFileSync('./index.html');
var words = fs.readFileSync('./words.txt');
var qs = require('querystring');
var answer = require('./answer.js');
var main = fs.readFileSync("./main.js");
require('env2')('config.env');

var apiKey = process.env.DB_API;

function handler(request, response){
  var url = request.url;
  console.log(url);
  if (url.match('/search')) {
      var data = url.split("/search")[1];
      console.log("DATAAAAAA", data);
      var resultArray = answer.arrayMaker(data);
      var result;
      var randomWord = answer.randomWord(resultArray);
      answer.getDefinition(apiKey, randomWord, function(word) {
         result = word;
         for(var i=0; i < resultArray.length; i++) {
           if(resultArray[i] == randomWord) resultArray[i] += "$";
         }
         var finalResult = resultArray.join("*") + "*" + result;
         console.log(finalResult);
         response.end(finalResult);
      });
      // setTimeout(function(){
      //   var finalResult = resultArray.join("*") + "*" + result;
      //   response.end(finalResult);
      // }, 2000);
  }
  else if(url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index);
  }
  else if(url === '/words.txt') {
    response.writeHead(200);
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

var server = http.createServer(handler).listen(port);
console.log("Server is listening at localhost:8080");

module.exports = {
   handler: handler,
   server: server
};
