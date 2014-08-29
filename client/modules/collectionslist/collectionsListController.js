angular.module('curates.collectionslist', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('collectionsList', {
    url: '/',
    templateUrl: 'modules/collectionslist/collectionsList.html'
  });

})

.controller('CollectionsListController', function($scope) {
  $scope.ready = 'Hooray!';
})
