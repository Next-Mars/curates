angular.module('curates.editCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('editCollection', {
  	url: '/{param}/edit',
  	templateUrl: 'modules/editCollection/editCollection.html'
  })
})

.controller('editCollectionController', function($scope, $stateParams) {
  $scope.ready = "Hooray!";
})
