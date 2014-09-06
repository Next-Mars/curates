module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      continuous: { 
        detectBrowsers: {
          enabled: false,
          usePhantomJS: true
        },
        browsers: ['PhantomJS']
      },
      dev: {
        detectBrowsers: {
          usePhantomJS: false
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    jshint: {
      files: [

        'Gruntfile.js',
        'client/**/*.js',
        'server/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: ['client/lib/**/*.js']
      }
    },

    watch: {
      scripts: {
        files: [
          'client/**/*.js',
          'server/**/*.js'
        ],
        tasks: [
          'jshint',
          'karma:dev:run',
          'mochaTest'
        ]
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');


  grunt.registerTask('dev', function(target) {
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
    grunt.task.run(['watch']);

  });


  grunt.registerTask('test', [
      'jshint',
      'karma:continuous',
      'mochaTest'
    ]
  );


};
