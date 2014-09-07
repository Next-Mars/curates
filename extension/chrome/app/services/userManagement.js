angular.module('curates.services', [])
.factory('userManagement', function() {

  var user = {};
  var loggedIn = false;
  var initUser = function() {
    user.givenName = '';
    user.id = '';
    user.fullName = '';
    user.provider = '';
    loggedIn = false;
  }
  var login = function(name) {
    console.log(name);
    user.givenName = name;
    user.id = name;
    user.fullName = name;
    user.provider = 'test';
  };
  var logout = function() {
    initUser();
  };
  var validateUser = function(target) {
    return target.provider === user.provider && target.id === user.id
  };
  return {
    user: user,
    loggedIn: loggedIn,
    login: login,
    logout: logout,
    validateUser: validateUser
  };
})
.controller('userMangamentController', function($scope, userManagement) {
  $scope.user = userManagement.user;
  $scope.loggedIn = userManagement.loggedIn;
  $scope.login = function(name) {
    userManagement.loggedIn = true;
    $scope.loggedIn = true;
    userManagement.login(name);
  };
  $scope.logout = function() {
    userManagement.loggedIn = false;
    $scope.loggedIn = false;
    userManagement.logout();
  }
})
