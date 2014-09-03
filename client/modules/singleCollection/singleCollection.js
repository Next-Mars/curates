angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('singleCollection', {
    url: '/user/:user/:collection',
    templateUrl: 'modules/singleCollection/singleCollection.html'
  })
})

.controller('singleCollectionController', function($scope, $stateParams, collectionFactory, userManagement) {
  var url = '/user/' + $stateParams.user + '/' + $stateParams.collection;
  collectionFactory.getCollection(url).then(function(collection) {
    console.log(collection.data);
    $scope.collection = collection.data;
    $scope.isUser = userManagement.user.username === $scope.collection.user;
    console.log($scope.isUser);
  });
});
