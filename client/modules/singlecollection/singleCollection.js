angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('singleCollection', {
    url: '/{collectionId:[0-9]{1,8}}',
    templateUrl: 'modules/singlecollection/singleCollection.html'
  })
})

.controller('singleCollectionController', function($scope, $stateParams) {
  $scope.collection = $stateParams.collectionId;
});
