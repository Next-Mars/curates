angular.module('curates', [
  'ui.router',
  'curates.collectionslist',
  'curates.singleCollection',
  'curates.editCollection',
  'curates.services',
  'curates.collectionFactory',
  'curates.personalCollectionList'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

});
