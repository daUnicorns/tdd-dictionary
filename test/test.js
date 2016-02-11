var assert = require('assert');
var testindex = 1; // see: https://testanything.org/tap-version-13-specification.html
var test = require('tape');
var main = require('../main.js');
var apiKey = require("../apiKey.js"), api = apiKey.apiKey;

// test("1. Trying to return the searched word from the wordnik api", function (t) {
//     t.deepEqual(main.getAPIobject(api, "cat"), "cat", "success!");
//     t.end();
// });

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );

  assert.equal(typeof main, 'object');
  console.log("BOUH");
  assert.equal(main.getAPIobject(api, "cat"), "cat");
}



QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
