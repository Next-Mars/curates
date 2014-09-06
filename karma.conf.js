module.exports = function(config) {

  var hostname = process.env.WERCKER_PHANTOMJS_HOST || 'localhost'; 
  var port = process.env.WERCKER_PHANTOMJS_PORT || 9100;

  config.set({
    basepath: '',

    frameworks: ['jasmine', 'detectBrowsers'],

    files: [
      'client/lib/angular/angular.js',
      'client/lib/angular-ui-router/release/angular-ui-router.js',
      'client/lib/angular-mocks/angular-mocks.js',

      'client/*.js',
      'client/directives/**/*.js',
      'client/modules/**/*.js',
      'client/services/**/*.js',
      'node_modules/expect.js/index.js'
    ],

    exclude: [
      'karma.conf.js'
    ],

    reporters: ['mocha'],
    
    hostname: hostname,
    
    port: port,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    plugins: [
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-phantomjs-launcher',
      'karma-detect-browsers'
    ],

    browsers: ['Chrome'],

    singleRun: true
  });
};