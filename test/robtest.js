var test = require('tape');
var main = require('../main.js');
var colors = require('colors');

test("tests if main.js has access to words.txt", function(t){
   t.deepEquals(main.wordImporter('A'), 0 , "I can't believe it! A is position 0 in the array");
   t.end();
});

test("tests if main.js will return an array including the searched word and the 4 that come after it", function(t){
   t.deepEquals(main.arrayMaker("A"), ['A', 'a', 'aa', 'aal', 'aalii'], "There's an array baby!!");
   t.end();
});
