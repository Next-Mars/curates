angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('singleCollection', {
      url: '/:url',
      templateUrl: 'modules/singleCollection/singleCollection.html'
    })
})

.controller('singleCollectionController', function($scope, $state, $stateParams, collectionFactory, userManagement) {
  var url = $stateParams.url;
  var init = function(collection) {

    if (collection != null) {
      $scope.isUser =
        (userManagement.user.id === collection.user.id &&
        userManagement.user.provider === collection.user.provider);
      $scope.collection = collection;
      var user = userManagement.user.provider + userManagement.user.id;
      $scope.notYetUpvoted = !_.contains($scope.collection.userStars, user);
    }
  };

  collectionFactory.getCollection(url)
    .then(init);

  $scope.upVote = function() {
    // $scope.notYetUpvoted = false;
    console.log("i have upvoted");
    var update = {};
    update.user = userManagement.user;
    update._id = $scope.collection._id;
    collectionFactory.addStar(update)
      .then(init);
  };

  $scope.clone = function() {
    $state.go('createCollection', {
      url: $scope.collection.url
    });
  };

});
