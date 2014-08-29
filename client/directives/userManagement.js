angular.module('curates')
.directive('userManagement', function() {
  return {
    restrict: 'E',
    // scopes: {
    //   user: '='
    // },
    templateUrl: 'directives/userManagement.html'
  }
})
