angular.module('curates.services', [])
.factory('userManagement', function() {

  var user = {
    name: '',
    loggedIn: false
  };
  var login = function(name) {
    user.name = name;
    user.loggedIn = true;
  };
  var logout = function() {
    user.name = '';
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
