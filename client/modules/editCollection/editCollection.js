angular.module('curates.editCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('editCollection', {
  	url: '/:user/:collection/edit',
  	templateUrl: 'modules/editCollection/editCollection.html'
  })
})

.controller('editCollectionController', function($scope, $stateParams, userManagement, collectionFactory) {
  var url = $stateParams.user + '/' + $stateParams.collection;
  $scope.editable = false;
  if (userManagement.user.name === $stateParams.user) {
    $scope.editable = true;
    $scope.collection = collectionFactory.getCollection(url);
  }
  $scope.submitCollectionEdit = function() {
    collectionFactory.updateCollection($scope.collection);
  }
})
