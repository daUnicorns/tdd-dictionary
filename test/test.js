var test = require('tape');
var answer = require('../answer.js');
var colors = require('colors');
var istanbul = require('istanbul');
var server = require('../server.js');
var shot = require('shot');
var main = require('../main.js');


////////////////////////////// answer.js tests //////////////////////////////

test("tests if answer.js will return an array including the searched word and the 4 that come after it", function(t) {
   t.deepEquals(answer.arrayMaker("A"), ['A', 'a', 'aa', 'aal', 'aalii'], "There's an array baby!!");
   t.end();
});

test("tests if randomDefintion() will return a random definiton from an array of words ", function(t) {
  var result = typeof answer.randomWord(["cat", "dog", "bird"]);
  var expected = "string";
   t.deepEquals(result, expected, "There's a random word!");
   t.end();
});


test("tests if we can grab the API key", function(t) {
   t.deepEquals(answer.printApi().length, 49, "we hid the api key, such magic so magician ");
   t.end();
});
test("does the getAPIobject function return the word that we searched", function(t) {
   var result;
   var expected = "A set of written, printed, or blank pages fastened along one side and encased between protective covers.";
   answer.getDefinition(process.env.DB_API, "book", function(word) {
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
      t.notDeepEqual(res.payload.indexOf('<title>daDicttionary</title>'), -1, "We have loaded our homepage.");
      t.end();
   });
});

test("If url has /words.txt it will return the file word.txt", function(t) {
   shot.inject(server.handler, {method: 'get', url: 'http://localhost:8080/words.txt'}, function(res) {
      t.deepEquals(res.payload.indexOf('A'), 0, "Then A is 0.");
      t.end();
   });
});

test("Testing to see if cs/js files are loaded when index.html loads.", function(t) {
   shot.inject(server.handler, {method: 'get', url: 'http://localhost:8080/style.css'}, function(res) {
      t.notDeepEqual(res.payload.indexOf('url(https://fonts.googleapis.com/css?family=Special+Elite|Audiowide|VT323|Kelly+Slab') -1, "This is some junk from the CSS. =)");
      t.end();
   });
});

test("Testing that a word is searched", function(t) {
   shot.inject(server.handler, {method: "get", url: "http://localhost:8080/search"}, function(res) {
      t.deepEquals(res.payload.indexOf('A'), 0, "blah blah blah");
      t.end();
   });
});

server.server.close();

// test("We're going to test the chunking function now", function(t) {
//
// });
