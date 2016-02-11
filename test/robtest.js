var test = require('tape');
var main2 = require('../main2.js');
var colors = require('colors');
var main = require('../main.js')

test("tests if main.js has access to words.txt", function(t){
   t.deepEquals(main2.wordImporter('A'), 0 , "I can't believe it! A is position 0 in the array");
   t.end();
});

test("tests if main.js will return an array including the searched word and the 4 that come after it", function(t){
   t.deepEquals(main2.arrayMaker("A"), ['A', 'a', 'aa', 'aal', 'aalii'], "There's an array baby!!");
   t.end();
});

test("tests if I can grab the API key", function(t){
   t.deepEquals(main2.printApi().length, 49, "we hid the api key, such magic so magician ");
   t.end();
});
