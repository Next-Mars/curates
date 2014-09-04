angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('singleCollection', {
    url: '/:user/:collection',
    templateUrl: 'modules/singleCollection/singleCollection.html'
  })
})

.controller('singleCollectionController', function($scope, $stateParams, collectionFactory, userManagement) {
  var url = $stateParams.user + '/' + $stateParams.collection;
  // if the url doesn't exist, take the user somewhere else?
  $scope.collection = collectionFactory.getCollection(url);
  $scope.isUser = userManagement.user.name === $scope.collection.user;
});
