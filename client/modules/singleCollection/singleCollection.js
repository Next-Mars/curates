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
  collectionFactory.getCollection(url).then(function(collection) {
    console.log(collection);
    $scope.collection = collection;
    $scope.isUser = userManagement.user.name === $scope.collection.username;
  });
});
