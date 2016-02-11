var fs = require('fs');

function wordImporter(value) {
  var words = fs.readFileSync('words.txt');
  var ArrayOfWords = words.toString().split('\n');
  return ArrayOfWords.indexOf(value);
}

function arrayMaker(value) {
   var words = fs.readFileSync('words.txt');
   var ArrayOfWords = words.toString().split('\n');
   var placeInArray = ArrayOfWords.indexOf(value);
   var array = [];
   for (var counter = placeInArray; counter < placeInArray+5; counter++) {
      array.push(ArrayOfWords[counter]);
   }
   return array;
}
module.exports = {
   wordImporter: wordImporter,
   arrayMaker: arrayMaker
};

console.log(arrayMaker('A'));
