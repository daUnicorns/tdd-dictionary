function importData() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
      var res = xhr.responseText.split("*");
      console.log(res);
      printData(res);
    }
  };

  xhr.open("GET", "/");
  xhr.send();
}

function printData(arr) {
  var definition = arr[arr.length-1];
  console.log(definition);
  document.getElementById('definition').innerHTML = definition;
}

document.addEventListener("submit", function() {
  importData();
  console.log("yes");
});
