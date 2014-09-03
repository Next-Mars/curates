angular.module('curates.collectionFactory', [])
.factory('collectionFactory', function($http){

  var getCollection = function(url) {
    console.log(url);
    return $http({
      method: 'GET',
      url: url
    }).success(function(collection) {
      console.log(collection);
      return collection;
    }).error(function(error) {
      console.log(error);
    });
  };

  var getListData = function() {
    return $http({
      method: 'GET',
      url: '/all'
    }).then(function(response) {
      return response.data;
    });
  };

  var getUserCollections = function(user) {
    return $http({
      method: 'GET',
      url: '/user/' + user
    }).then(function(response) {
      return response.data;
    });
  };

  var updateCollection = function(collection) {
    return $http({
      method: 'POST',
      url: 'collection/' + collection.id,
      data: collection
    }).then(function(response) {
      return response.data;
    });
  };

  var createCollection = function(collection) {
    collection.url = collection.collection_url;
    delete collection.collection_url;
    console.log(collection);
    return $http({
      method: 'POST',
      url: 'collection',
      data: JSON.stringify(collection)
    }).then(function(response) {
      return response.data;
    });
  };

  return {
    getCollection: getCollection,
    getListData: getListData,
    getUserCollections: getUserCollections,
    updateCollection: updateCollection,
    createCollection: createCollection
  };

})
