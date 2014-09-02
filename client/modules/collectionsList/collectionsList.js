angular.module('curates.collectionsList', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('collectionsList', {
    url: '/',
    templateUrl: 'modules/collectionsList/collectionsList.html'
  });
})
.controller('collectionsListController', function($scope, collectionFactory) {
  $scope.listData = collectionFactory.getListData().collections;
});
