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
  console.log(user.username);
  collectionFactory.getUserCollections(user.username).then(function(collections) {
    console.log(collections);
    $scope.collections = collections;
  })
});
