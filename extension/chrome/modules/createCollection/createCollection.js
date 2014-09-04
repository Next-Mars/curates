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
  $scope.loggedIn = userManagement.user.loggedIn;

  // New empty collection
  $scope.collection = {};
  $scope.collection.user = userManagement.user.name;

  // called on submitting the form
  $scope.create = function() {
    // Setting the url quick and dirty. 
    // We need to implement a function to generate urls
    $scope.collection.url = $scope.collection.user + '/' + $scope.collection.title;
    collectionFactory.createCollection($scope.collection);

    // This is where I stopped. 
    // Edit collection and createCollection will share
    // a lot of the same functionality. Devise a way to 
    // share code! There are many options.

  }
})