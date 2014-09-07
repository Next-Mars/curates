angular.module('curates.myCollections', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('myCollections', {
    url: '/myCollections',
    templateUrl: 'modules/myCollections/myCollections.html'
  });
})

.controller('myCollectionsController', function($scope, $stateParams, collectionFactory, userManagement) {
  var user = userManagement.user;
  collectionFactory.getUserCollections(user).then(function(collections) {
    $scope.collections = collections;
  });
});
