angular.module('curates', [
  'ui.router',
  'curates.collectionslist',
  'curates.singleCollection',
  'curates.editCollection',
  'curates.services',
  'curates.collectionFactory'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});
