angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('singleCollection', {
    url: '/{collectionId:[0-9]{1,8}}',
    templateUrl: 'modules/singleCollection/singleCollection.html'
  })
})

.controller('singleCollectionController', function($scope, $stateParams) {
  $scope.collection = $stateParams.collectionId;
});
