var helper = require("../db/countries_query_helper.js")
var express = require("express");
var countriesRouter = express.Router();

countriesRouter.get("/", function(req, res) {

  helper.all(function(countries) {
    res.json(countries);
  });
})

module.exports = countriesRouter;
