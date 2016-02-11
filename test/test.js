var test = require('tape');
var main = require('../main.js');
var apiKey = require("../apiKey.js"), api = apiKey.apiKey;

console.log("test1");

test("1. Trying to return the searched word from the wordnik api", function (t) {
    t.deepEqual(main.getAPIobject(api, "cat"), "cat", "success!");
    console.log("test2");
    t.end();
});
