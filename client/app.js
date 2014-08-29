angular.module('curates', [
  'ui.router',
  'curates.collectionslist',
  'curates.singleCollection'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});
