angular.module('curates.editCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('editCollection', {
  	url: '/:collectionUrl/edit',
  	templateUrl: 'modules/editCollection/editCollection.html'
  });
})

.controller('editCollectionController', function($scope, $stateParams, $state, userManagement, collectionFactory) {
  // Initialize scope variables
  $scope.editable = false;
  $scope.toRemove = [];

  // Retrieve collection
  collectionFactory.getCollection($stateParams.collectionUrl).then(function(collection) {
    // Check that this is the current users collection
    if (userManagement.validateUser(collection.user)) {
      $scope.editable = true;
      $scope.collection = collection;
    }
  });

  // Called when the form is submitted
  $scope.submitCollectionEdit = function() {
    // Remove each link that has been marked for removal
    $scope.toRemove.forEach(function(index) {
      $scope.collection.links.splice(index, 1);
    });

    // send the updated collection to the server
    collectionFactory.updateCollection($scope.collection).then(function(collection) {
      // redirect user back to singleCollection view
      $state.go('singleCollection', {
        url: collection.url
      });
    });
  };

  // add or removes the given index from the toRemove array
  // called when the remove checkbox is ticked or unticked
  $scope.toggleRemove = function(index) {
    if (_.contains($scope.toRemove, index)) {
      $scope.toRemove = _.without($scope.toRemove, index);
    } else {
      $scope.toRemove.push(index);
    }
  };

  // add a link to this collection
  $scope.addLink = function() {
    $scope.collection.links.push({url: '', title: '', description: ''});
  };
});
