angular.module('curates.services', [])
.factory('userManagement', function($http) {

  var user = {};
  user.username = null;
  user.loggedIn = false;
  var login = function(name) {
    // Check if user exists
    $http({
      method: 'GET',
      url: '/user/' + name
    }).success(function(data) {
      user.username = data.username;
      user.loggedIn = true;
      console.log(user);
    }).error(function(data) {
      // User not yet registered, register them
      $http({
        method: 'POST',
        url: '/user',
        data: { username: name }
      }).success(function(data) {
        // data is user id
        user.username = name;
        user.loggedIn = true;
        console.log(data);
      }).error(function(data) {
        console.log('failed to create user', data);
      });
    });
  };
  var logout = function() {
    user.username = null;
    user.loggedIn = false;
  };
  return {
    user: user,
    login: login,
    logout: logout
  };
})
.controller('userMangamentController', function($scope, userManagement) {
  $scope.user = userManagement.user;
  $scope.login = userManagement.login;
  $scope.logout = userManagement.logout;
})
