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
				jshintrc: '.jshintrc'
			}
		},

		watch: {
			scripts: {
				files: [
				  'client/**/*.js',
			    'server/**/*.js'
				],
				tasks: [
				  'mochaTest',
				  'jshint'
				]
			}
		}

	});
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
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
  	  'mochaTest'
  	]
  );


};