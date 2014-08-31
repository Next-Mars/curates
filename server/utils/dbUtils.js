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
        var collection_id = fetchedCollection.get('id');

        // var options = {
        //   method: 'update'
        // }
      } else {
        var collection_id = null;
        // var options = {
        //   method: 'save'
        // }
      }
      // callback(options);
      callback(collection_id);
    });
}

// check links
