angular.module('curates.createCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('createCollection', {
      url: '/create?url',
      templateUrl: 'modules/createCollection/createCollection.html'
    });
})

.controller('createCollectionController', function($scope, $state, $stateParams, userManagement, collectionFactory) {
  console.log("stateParams url: ", $stateParams.url);
  // Only loggedIn users can create collections
  $scope.loggedIn = userManagement.loggedIn;

  // Initialize new collection

  var initialize = function() {
    //if createCollection is passed a collection url through $stateParams.url
    //query database for data for that collection url
    //and pre-populate the new collection form with that data
    $scope.collection = {};
    $scope.collection.user = userManagement.user;
    $scope.collection.links = [];
    $scope.collection.title = '';
    $scope.collection.description = '';
    if ($stateParams.url) {
      collectionFactory.getCollection($stateParams.url)
        .then(function(collection) {
          $scope.collection.description = collection.description;
          $scope.collection.links = collection.links;
        })
    }
  };
  initialize();
  // called on submitting the form
  $scope.submitCreate = function() {
    collectionFactory.createCollection($scope.collection).then(function(collection) {
      $state.go('singleCollection', {
        url: collection.url
      });
    });
  };

  $scope.addLink = function() {
    $scope.collection.links.push({
      url: '',
      title: '',
      description: ''
    });
  };
});
