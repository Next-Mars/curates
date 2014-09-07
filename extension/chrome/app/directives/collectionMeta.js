angular.module('curates')
.directive('collectionMeta', function() {
  return {
    restrict: 'E',
    scopes: {
      collection: '='
    },
    templateUrl: 'directives/collectionMeta.html'
  }
});