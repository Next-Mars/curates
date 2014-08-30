angular.module('curates.personalCollectionList', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('personalCollectionList', {
    url: '/{personalCollectionsListId:[0-9]{1,8}}',
    templateUrl: 'modules/personalCollectionsList/personalCollectionsList.html'
  })
})

.controller('personalCollectionsList', function($scope, $stateParams) {
  $scope.collectionlist = $stateParams.personalCollectionsListId;
});
