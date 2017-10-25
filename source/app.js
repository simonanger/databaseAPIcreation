var requestHelper = require("./helpers/request_helper.js")
var renderList = require('../public/views/renderList.js')
var url = "https://restcountries.eu/rest/v2/all";

var state = {}

var makeRequest = function() {
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    countries = JSON.parse(this.responseText);
    state.countries = countries
    render(countries)
    console.log(countries);
  })
  request.send();
}

var render = function(countries) {
  var list = document.getElementById("list");

  for (country of countries) {
    var option = document.createElement("option");
    option.innerText = country.name;
    list.appendChild(option);
    var dropDown = document.querySelector("select");
    dropDown.addEventListener("change", handleSelectChange);
  }

}

var updateBucket = function(country) {
  var bucket = document.querySelector("ul")
  var li = document.createElement("li");
  li.innerText = country.name;
  bucket.appendChild(li);
}

var handleSelectChange = function(event) {
  var country = countries[event.target.selectedIndex -1];
  updateBucket(country);

  requestHelper.postRequest(
    'http://localhost:3000/api/countries',
    function (result) {
      console.log('response to post request', result)
      render(result)
    },
    country
  )

  console.log(country);
}



window.addEventListener("load", makeRequest)
window.addEventListener('DOMContentLoaded', function () {

  // If we'd had more time we would have put this UI code in its own file
  // Perhaps in a folder called 'views', a file called film_view.js

  // makeFormWork()

  requestHelper.getRequest('http://localhost:3000/api/countries', function (countries) {
    console.log(countries)

    renderList(countries)

  })


})
