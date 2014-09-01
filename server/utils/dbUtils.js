var db = require('../dbconfig');
var Collection = require('../models/collection');
var User = require('../models/user');
var Link = require('../models/link');

//check user

exports.userExists = function(user, callback) {
  var username = user.username;

  new User({
    username: username
  })
    .fetch()
    .then(function(fetchedUser) {
      console.log("I am the fetchedUser", fetchedUser);
      if (fetchedUser) {
        var user_id = fetchedUser.get('id');
      } else {
        var user_id = null;
      }
      callback(user_id);
    });
};
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
      } else {
        var collection_id = null;
      }
      callback(collection_id);
    });
}

// check links

exports.linkExists = function(link, callback) {
  var url = link.url;

  new Link({
    link_url: url
  })
    .fetch()
    .then(function(fetchedLink) {
      console.log("I am the fetchedLink: ", fetchedLink);
      if (fetchedLink) {
        var link_id = fetchedLink.get('id');
      } else {
        var link_id = null;
      }
      callback(link_id);
    });
};

// need to refactor below into above function
exports.linkExistsInSpecificCollection = function(url, c_id, callback) {
  var c_id = c_id;
  new Link()
    .query({
      where: {
        link_url: url
      },
      andWhere: {
        c_id: c_id
      }
    })
    .fetch()
    .then(function(fetchedLink) {
      if (fetchedLink) {
        var link_id = fetchedLink.get('id');
      } else {
        var link_id = null;
      }
      console.log("link found:    ", fetchedLink);
      callback(link_id);
    });
};
