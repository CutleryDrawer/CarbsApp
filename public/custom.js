var food = {};

function handleSuccess() {
  var data = JSON.parse(this.responseText);
    for (var item in data) {
      if (data.hasOwnProperty(item)){
      var li = document.createElement("li");
        li.className += " collection-item avatar";

        var item1 = document.createElement("i");
        item1.className += "material-icons circle green";
        item1.textContent = "brightness_1";

        var item2 = document.createElement("span");
        item2.className += "title";
        item2.textContent =  data[item] ['name'];

        var item3 = document.createElement("p");
        item3.textContent = "Carbohydrate" + data[item] ['nutritionper100gcarbohydrate'];

        var item4 = document.createElement("a");
        item4.href = "/food";
        item4.className += "secondary-content";
        item4.setAttribute("data-name", data[item]["name"]);
        item4.setAttribute("data-fat", data[item]["nutritionper100gfat"]);
        item4.setAttribute("data-carbs", data[item]["nutritionper100gprotein"]);
        item4.setAttribute("data-sugars", data[item]["nutritionper100gsugars"]);

        var item4_child = document.createElement("i");
        item4_child.className = "material-icons";
        item4_child.innerHTML = "grade";

        item4.appendChild(item4_child);

        li.appendChild(item1);
        li.appendChild(item2);
        li.appendChild(item3);
        li.appendChild(item4);

        food.name = item4.getAttribute("data-name");
        food.fat = item4.getAttribute("data-fat");
        food.carbs = item4.getAttribute("data-carbs");
        food.sugars = item4.getAttribute("data-sugars");

        var result = document.getElementById("foods");
        result.appendChild(li);
    }
    if(item4.addEventListener){
      item4.addEventListener("click", function(event){
        var target = event.currentTarget;

        sessionStorage.clear();
        //save data to sessionStorage
        sessionStorage.setItem('food-name', target.getAttribute("data-name"));
        sessionStorage.setItem('food-fat', target.getAttribute("data-fat"));
        sessionStorage.setItem('food-carbs', target.getAttribute("data-carbs"));
        sessionStorage.setItem('food-sugars', target.getAttribute("data-sugars"));
      });
    }
  }
}

function handleError() {
    //Function to handle the request if it fails / unsuccessful
    var h5 =  document.getElementById("list");
    h5.style.color = "red";
    h5.innerHTML = "An error occurs";
    var error = document.getElementById("main");
    error.appendChild(h5);
}

//Create an XHR object
var xhr = new XMLHttpRequest();
xhr.open('GET', '/foods');
xhr.onload = handleSuccess;
xhr.onerror = handleError;
xhr.send();