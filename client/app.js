angular.module('curates', [
  'ui.router',
  'curates.collectionslist',
  'curates.singleCollection',
  'curates.editCollection',
  'curates.services'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});
