'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

//chrome.browserAction.setBadgeText({text: '\'Saved'});

//console.log('\'Allo \'Allo! Event Page for Browser Action');


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
