var MongoClient = require('mongodb').MongoClient

var countriesQueryHelper = {
  url: "mongodb://localhost:27017/bucket_list",
  all: function(onQueryFinished) {

    MongoClient.connect(this.url, function (err, db) {

      var countriesCollection = db.collection('countries')

      countriesCollection.find().toArray(function (err, docs) {
        onQueryFinished(docs)
      })
    })
  }
}

module.exports = countriesQueryHelper

//
//
// var filmsQueryHelper = {
//   url: 'mongodb://localhost:27017/film_reviews_site',
//   all: function (onQueryFinished) {
//
//     console.log(Date.now(), 'filmsQueryHelper.all')
//
//     MongoClient.connect(this.url, function (err, db) {
//       console.log(Date.now(), 'MongoClient.connect callback')
//
//       var filmsCollection = db.collection('films')
//
//       filmsCollection.find().toArray(function (err, docs) {
//         console.log(Date.now(), '.find().toArray() callback')
//         console.log(Date.now(), 'calling onQueryFinished with docs')
//         onQueryFinished(docs)
//       })
//
//     })
//   }
