angular.module('curates.createCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('createCollection', {
      url: '/create',
      templateUrl: 'modules/createCollection/createCollection.html'
    });
})

.controller('createCollectionController', function($scope, $rootScope, $state, userManagement, collectionFactory) {

  // Only loggedIn users can create collections
  $scope.loggedIn = userManagement.user.loggedIn;

  // Initialize new collection
  $scope.collection = {};
  $scope.collection.user = userManagement.user.username;
  $scope.collection.links = [];
  $scope.collection.title = '';
  $scope.collection.description = '';

  //  the following code generates a url by ommitting invalid url charachters
  // (not currently exhaustive!)
  // The characters between the [] and after ^ are allowed characters
  $scope.$watch(
    function() { return $scope.collection.title; }, 
    function() {
      $scope.collection.collection_url = '/user/' + $scope.collection.user + '/' +
        $scope.collection.title.replace(/[^A-Za-z0-9\-]/g,'').toLowerCase();
    }
  );
  // called on submitting the form
  $scope.submitCreate = function() {
    collectionFactory.createCollection($scope.collection).then(function(collection) {
      // DONT FORGET TO UPDATE THIS AFTER UPDATING SINGLE COLLECTION
      $state.go('singleCollection', {
        url: collection.collection_url
      });
    });
  };

  $scope.addLink = function() {
    $scope.collection.links.push({url: '', title: '', description: ''});
  };
})