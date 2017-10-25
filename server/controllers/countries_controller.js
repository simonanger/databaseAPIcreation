var helper = require("../db/countries_query_helper.js")
var express = require("express");
var countriesRouter = express.Router();

countriesRouter.get("/", function(req, res) {

  helper.all(function(countries) {
    res.json(countries);
  });
})

countriesRouter.post("/", function (req, res) {
  var country = req.body
  // console.log('country in POST route', country)
  helper.save(country, function(updatedCountries) {
    res.json(updatedCountries)
  })
})



module.exports = countriesRouter;
