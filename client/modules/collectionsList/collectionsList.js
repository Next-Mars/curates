angular.module('curates.collectionsList', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('collectionsList', {
      url: '/',
      templateUrl: 'modules/collectionsList/collectionsList.html'
    });
})
  .controller('collectionsListController', function($scope, collectionFactory) {
    // Initialize empty array to hold collection on scope
    $scope.listData = [];
    // Initialize search filter string used in ng-repeat orderBy filter   
    $scope.predicate = '-stars';
    
    // Get data from factory and populate listData with list of collections
    collectionFactory.getListData().then(function(collections) {
      $scope.listData = collections;
    })
  });
