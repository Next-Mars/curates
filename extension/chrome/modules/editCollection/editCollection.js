angular.module('curates.editCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('editCollection', {
  	url: '/:user/:collection/edit',
  	templateUrl: 'modules/editCollection/editCollection.html'
  });
})

.controller('editCollectionController', function($scope, $stateParams, $state, userManagement, collectionFactory) {
  // Initialize scope variables
  $scope.editable = false;
  $scope.toRemove = [];

  // if this is the logged in users page, enable editting
  if (userManagement.user.name === $stateParams.user) {
    $scope.editable = true;

    // Retrieve the collection data from the server
    var url = $stateParams.user + '/' + $stateParams.collection;
    $scope.collection = collectionFactory.getCollection(url);
  }

  // Called when the form is submitted
  $scope.submitCollectionEdit = function() {
    // Remove each link that has been marked for removal
    $scope.toRemove.forEach(function(index) {
      $scope.collection.links.splice(index, 1);
    });

    // send the updated collection to the server
    collectionFactory.updateCollection($scope.collection);

    // redirect the user back to the singleCollection view of the collection they just editted
    var url = $scope.collection.url.split('/');
    $state.go('singleCollection', { 
      user: url[0],
      collection: url[1]
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
  }
});
