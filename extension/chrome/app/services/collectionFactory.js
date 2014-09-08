angular.module('curates.collectionFactory', [])
.factory('collectionFactory', function($http){
  var baseUrl = 'http://curates.azurewebsites.net';
  var getCollection = function(url) {
    return $http({
      method: 'GET',
      url: baseUrl + '/api/collection/' + url
    }).then(function(response) {
      if (response.data === 'null') {
        return null;
      }
      return response.data;
    });
  };

  var getListData = function() {
    return $http({
      method: 'GET',
      url: baseUrl + '/api/all'
    }).then(function(response) {
      return response.data;
    });
  };

  var getUserCollections = function(user) {
    return $http({
      method: 'GET',
      url: baseUrl + '/api/user/' + user.provider + '/' + user.id
    }).then(function(response) {
      return response.data;
    });
  };

  var updateCollection = function(collection) {
    return $http({
      method: 'POST',
      url: baseUrl + '/api/collection/update',
      data: collection
    }).then(function(response) {
      return response.data;
    });
  };

  var createCollection = function(collection) {
    return $http({
      method: 'POST',
      url: baseUrl + '/api/collection/create',
      data: collection
    }).then(function(response) {
      return response.data;
    });
  }

  return {
    getCollection: getCollection,
    getListData: getListData,
    getUserCollections: getUserCollections,
    updateCollection: updateCollection,
    createCollection: createCollection
  };

})
