function importData() {
  var xhr = new XMLHttpRequest();
  var formData = document.getElementById("input").value;
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var res = xhr.responseText.split("*");
      printData(res);
    }
  };

  xhr.open("POST", "/search" + formData);
  xhr.send();
}

function printData(arr) {
  var definition = arr[arr.length-1];
  console.log(definition);
  document.getElementById('definition').innerHTML = definition;
}

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  importData();
  console.log("yes");
});
