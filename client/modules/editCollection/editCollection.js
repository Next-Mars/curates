angular.module('curates.editCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('editCollection', {
  	url: '/{collectionId:[0-9]{1,8}}/edit',
  	templateUrl: 'modules/editCollection/editCollection.html'
  })
})

.controller('editCollectionController', function($scope, $stateParams) {
  $scope.ready = "Hooray!";
})
