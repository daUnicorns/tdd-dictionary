var test = require('tape');
var main2 = require('../main2.js');
var colors = require('colors');
var main = require('../main.js');
var istanbul = require('istanbul');
var server = require('../server.js');
var shot = require('shot');


////////////////////////////// main.js tests //////////////////////////////

test("tests if main.js has access to words.txt", function(t) {
   t.deepEquals(main2.wordFinder('A'), 0, "I can't believe it! A is position 0 in the array");
   t.end();
});
test("tests if main.js will return an array including the searched word and the 4 that come after it", function(t) {
   t.deepEquals(main2.arrayMaker("A"), ['A', 'a', 'aa', 'aal', 'aalii'], "There's an array baby!!");
   t.end();
});
test("tests if we can grab the API key", function(t) {
   t.deepEquals(main2.printApi().length, 49, "we hid the api key, such magic so magician ");
   t.end();
});
test("does the getAPIobject function return the word that we searched", function(t) {
   var result;
   var expected = "A set of written, printed, or blank pages fastened along one side and encased between protective covers.";
   main.getDefinition(process.env.DB_API, "book", function(word) {
      result = word;
   });
   setTimeout(function(x) {
      t.deepEquals(result, expected, "We have our word. Life is great!!!!!!!!");
      t.end();
   }, 1000);
});

////////////////////////////// server.js tests //////////////////////////////

test('Does the server respond with 200', function(t) {
   shot.inject(server.handler, {method: 'GET', url:'/'}, function(res) {
      t.deepEquals(res.statusCode, 200, "One Hundred & Eighty!!! + 20");
      t.end();
   });
});

test("tests if the url 'localhost:8080' returns the page", function(t) {
   shot.inject(server.handler, {method: 'get', url:'http://localhost:8080'}, function(res) {
      // console.log(res);
      t.notDeepEqual(res.payload.indexOf('<title>daDicttionary</title>'), -1, "We have loaded our homepage.");
      t.end();
   });
});


// test("tear downs", function(t) {
//    server.close();
//    t.end();
// });
