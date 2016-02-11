// var apiKey = require("apiKey.js"), api = apiKey.apiKey;

function getAPIobject(api, searchedWord) {
  // var req = new XMLHttpRequest();
  var req = require('xhr-browserify');
  var parsed;
  var url = "http://api.wordnik.com:80/v4/word.json/" + searchedWord + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + api;

req.onreadystatechange = function() {
  if(req.readyState === 4 && req.status === 200) {
    parsed = JSON.parse(req.response);
  }
}

req.open("GET", url, false);
req.send();

return parsed[0].word;

};

module.exports = {
  getAPIobject : getAPIobject
};
