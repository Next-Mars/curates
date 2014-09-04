angular.module('curates', [
  'ui.router',
  'curates.collectionsList',
  'curates.singleCollection',
  'curates.editCollection',
  'curates.services',
  'curates.collectionFactory',
  'curates.personalCollectionList',
  'curates.createCollection'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

});
