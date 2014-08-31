angular.module('curates.editCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('editCollection', {
  	url: '/:user/:collection/edit',
  	templateUrl: 'modules/editCollection/editCollection.html'
  })
})

.controller('editCollectionController', function($scope, $stateParams, $state, userManagement, collectionFactory) {
  var url = $stateParams.user + '/' + $stateParams.collection;
  $scope.editable = false;
  if (userManagement.user.name === $stateParams.user) {
    $scope.editable = true;
    $scope.collection = collectionFactory.getCollection(url);
  }
  $scope.submitCollectionEdit = function() {
    collectionFactory.updateCollection($scope.collection);
    var url = $scope.collection.url.split('/');
    $state.go('singleCollection', { 
      user: url[0],
      collection: url[1]
    });
  }
})
