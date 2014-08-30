angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('singleCollection', {
    url: '/:params',
    templateUrl: 'modules/singleCollection/singleCollection.html'
  })
})

.controller('singleCollectionController', function($scope, $stateParams) {
  $scope.collection = $stateParams.params;
});
