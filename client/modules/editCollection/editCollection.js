angular.module('curates.editCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('editCollection', {
  	url: '/:user/:collection/edit',
  	templateUrl: 'modules/editCollection/editCollection.html'
  });
})

.controller('editCollectionController', function($scope, $stateParams, $state, userManagement, collectionFactory) {
  var url = $stateParams.user + '/' + $stateParams.collection;
  $scope.editable = false;
  $scope.toRemove = [];
  if (userManagement.user.name === $stateParams.user) {
    $scope.editable = true;
    $scope.collection = collectionFactory.getCollection(url);
  }
  $scope.submitCollectionEdit = function() {
    collectionFactory.updateCollection($scope.collection);
    $scope.toRemove.forEach(function(index) {
      $scope.collection.links.splice(index, 1);
    });
    var url = $scope.collection.url.split('/');
    $state.go('singleCollection', { 
      user: url[0],
      collection: url[1]
    });
  };
  $scope.toggleRemove = function(index) {
    if (_.contains($scope.toRemove, index)) {
      $scope.toRemove = _.without($scope.toRemove, index);
    } else {
      $scope.toRemove.push(index);
    }
  };
  $scope.addLink = function() {
    $scope.collection.links.push({url: '', title: '', description: ''});
  }
});
