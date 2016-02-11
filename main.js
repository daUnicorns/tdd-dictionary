var fs = require('fs');

function wordImporter(value) {
  var allWords = __dirname + '/words.txt';
  var data = fs.readFileSync('words.txt');
  var superData = data.toString().split('\n');
}
