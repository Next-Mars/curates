angular.module('curates.createCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('createCollection', {
      url: '/create',
      templateUrl: 'modules/createCollection/createCollection.html'
    });
})

.controller('createCollectionController', function($scope, $state, userManagement, collectionFactory) {

  // Only loggedIn users can create collections
  $scope.loggedIn = userManagement.loggedIn;

  // Initialize new collection
  $scope.collection = {};
  $scope.collection.user = userManagement.user;
  $scope.collection.links = [];
  $scope.collection.title = '';
  $scope.collection.description = '';

  // called on submitting the form
  $scope.submitCreate = function() {
    collectionFactory.createCollection($scope.collection).then(function(collection) {
      $state.go('singleCollection', {
        url: collection.url
      });
    });
  };

  $scope.addLink = function() {
    $scope.collection.links.push({url: '', title: '', description: ''});
  };
});