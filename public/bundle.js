/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(1)
var renderList = __webpack_require__(2)
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var requestHelper = {
  getRequest: function (url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url)

    xhr.addEventListener("load", function() {
      var jsonString = xhr.responseText
      var data = JSON.parse(jsonString)
      callback(data)
    })

    xhr.send()
  },
  postRequest: function (url, callback, payload) {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url)

    xhr.addEventListener("load", function () {
      if (xhr.status !== 200) return
      var jsonString = xhr.responseText
      var data = JSON.parse(jsonString)
      callback(data)
    })

    xhr.setRequestHeader('Content-Type', 'application/json')

    var jsonString = JSON.stringify(payload)

    xhr.send(jsonString)
  }
}

module.exports = requestHelper


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var renderList = function (countries) {
  var bucket = document.getElementById('bucket')

  // This is grubby:
  bucket.innerHTML = ''

  var list = document.createElement('ul')

  countries.forEach(function (country) {
    var listItem = document.createElement('li')

    listItem.innerText = country.name

    list.appendChild(listItem)
  })


  bucket.appendChild(list)
}

module.exports = renderList


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map