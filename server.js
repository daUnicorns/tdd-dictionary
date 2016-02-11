var http = require("http");
var port = process.env.PORT || 8080;
var fs = require('fs');
var stylesheet = fs.readFileSync('./style.css');
var index = fs.readFileSync('./index.html');
var words = fs.readFileSync('./words.txt');
var qs = require('querystring');
// var main = require("main.js");

function handler(request, response){
  var url = request.url;
  console.log(url);
  if(url === '/style.css'){
    response.writeHead(200, {"Content-Type": "text/css"});
    response.end(stylesheet);
    console.log('style.css has been sent');
  }
  else if(url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index);
  } else if (request.method === 'POST' && request.url === '/search') {
    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      var data = qs.parse(body);
      console.log(data);
      // now you can access `data.email` and `data.password`
      response.writeHead(200);
      response.end(JSON.stringify(data));
    });
  } else if(url === '/words.txt') {
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
