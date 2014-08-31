angular.module('curates.collectionFactory', [])
.factory('collectionFactory', function($http){




  // MOCK DATA

  var collection1 = {
    id: 1,
    title: 'Angular Tutorials',
    url: 'Jack/AngularTutorials',
    description: 'Test description',
    user: 'Jack',
    links: [
      {
        url: 'http://www.duck.com/',
        title: 'Googles Duck',
        description: 'This is awesome!'
      },
      {
        url: 'http://www.angular.com/',
        title: 'Angular Rocks',
        description: 'Yay!'
      },
      {
        url: 'http://www.google.com/',
        title: 'Google Rules the World',
        description: 'I welcome my email-snooping overlord!'
      }
    ]
  };

  var listData = {
    collections: [
      {
        id: collection1.id,
        title: collection1.title,
        url: collection1.url,
        description: collection1.description,
        user: collection1.user
      },
      {
        id: 2,
        title: 'History of Greece',
        url: 'Andy/HistoryOfGreece',
        description: 'So much good sources on ancient greece',
        user: 'Andy'
      },
      {
        id: 3,
        title: 'Fruit Trees',
        url: 'Bob/FruitTrees',
        description: 'Fruit tree bonanza',
        user: 'Bob'
      }
    ]
  };

  var collections = {
    'Jack/AngularTutorials': collection1
  };

  var getCollection = function(url) {
    return collections[url];
  };

  var getListData = function() {
    return listData;
  };

  var getUserCollections = function(user) {
    return _.filter(collections, function(item) {
      return item.user === user;
    });
  };

  var updateCollection = function(collection) {
    collections[collection.url] = collection;
  }

  return {
    getCollection: getCollection,
    getListData: getListData,
    getUserCollections: getUserCollections,
    updateCollection: updateCollection
  };

})
