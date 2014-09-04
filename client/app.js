angular.module('curates', [
  'ui.router',
  'curates.collectionsList',
  'curates.myCollections',
  'curates.createCollection',
  'curates.singleCollection',
  'curates.editCollection',
  'curates.services',
  'curates.collectionFactory'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

});
