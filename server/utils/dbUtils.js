var db = require('../dbconfig');
var Collection = require('../models/collection');
var User = require('../models/user');
var Link = require('../models/link');

//check user

//check collection
exports.collectionExists = function(collection, callback) {
  var url = collection.collection_url;

  new Collection({
    collection_url: url
  })
    .fetch()
    .then(function(fetchedCollection) {
      console.log("I am the fetchedCollection: ", fetchedCollection);
      if (fetchedCollection) {
        var c_id = fetchedCollection.get('c_id');

        // var options = {
        //   method: 'update'
        // }
      } else {
        var c_id = null;
        // var options = {
        //   method: 'save'
        // }
      }
      // callback(options);
      callback(c_id);
    });
}

// check links
