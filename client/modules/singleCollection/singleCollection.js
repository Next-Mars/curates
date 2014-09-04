angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('singleCollection', {
    url: '/:url',
    templateUrl: 'modules/singleCollection/singleCollection.html'
  })
})

.controller('singleCollectionController', function($scope, $stateParams, collectionFactory, userManagement) {
  var url = $stateParams.url;
  collectionFactory.getCollection(url).then(function(collection) {
    if (collection != null) {
      $scope.isUser = 
        (userManagement.user.id === collection.user.id &&
        userManagement.user.provider === collection.user.provider);
      $scope.collection = collection;
    }
  });
});
