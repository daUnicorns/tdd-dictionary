function importData() {
   var xhr = new XMLHttpRequest();
   var formData = document.getElementById("input").value;
   xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
         var res = xhr.responseText.split("*");
         printData(res);
      }
   };

   setTimeout(function() {
      xhr.open("POST", "/search" + formData);
      xhr.send();
   }, 1000);
}

function printData(arr) {
   var rightAnswer = function() {
      for (var i = 0; i < arr.length; i++) {
         if (arr[i].indexOf("$") > -1) return arr[i].replace("$", "");
      }
   };

   var classElements = document.getElementsByClassName("spaceship");
   for (var j = 0; j < 5; j++) {
      classElements[j].innerHTML = '';
      classElements[j].setAttribute("id", "wrong-answer");
   }
   for (var i = 0; i < (arr.length) - 1; i++) {
      if (arr[i] === undefined) {
         classElements[i].innerHTML = "";
         classElements[i].setAttribute("id", "wrong-answer");
      }
      if (arr[i].indexOf("$") > -1) {
         classElements[i].innerHTML = arr[i].replace("$", "");
         classElements[i].setAttribute("id", "right-answer");
      } else {
         classElements[i].innerHTML = arr[i];
         classElements[i].setAttribute("id", "wrong-answer");
      }
   }


   var definition = arr[arr.length - 1];
   var defElement = document.getElementById('definition');
   defElement.innerHTML = definition;
   defElement.setAttribute("class", "background");
   document.getElementById('definitionBox').setAttribute("class", "flyingdefinition flyin");
}

document.getElementById("form").addEventListener("submit", function(e) {
   e.preventDefault();
   importData();
});

module.exports = {
   importData: importData,
   printData: printData
};
