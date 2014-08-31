angular.module('curates.personalCollectionList', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('myCollections', {
    url: '/myCollections',
    templateUrl: 'modules/personalCollectionsList/personalCollectionsList.html'
  });
})

.controller('personalCollectionsList', function($scope, $stateParams, collectionFactory, userManagement) {
  var user = userManagement.user;
  if (user.loggedIn) {
    $scope.collections = collectionFactory.getUserCollections(user.name);
  }
});
