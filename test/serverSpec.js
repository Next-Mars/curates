var expect = require('chai').expect;
var request = require('request');

var db = require('../server/dbconfig');
var User = require('../server/models/user');
var Collection = require('../server/models/link');
var Link = require('../server/models/link');

describe('', function() {

	beforeEach(function() {
	    // log out currently signed in user
	    // request('http://127.0.0.1:3000', function(error, res, body) {});

	    // delete link for roflzoo from db so it can be created later for the test
	    db.knex('users')
	      .where('username', '=', 'test')
	      .del()
	      .catch(function(error) {
	      	console.log("Error**********************");
	        throw {
	          type: 'DatabaseError',
	          message: 'Failed to create test setup data'
	        };
	      });

	    db.knex('users')
	      .where('username', '=', 'test2')
	      .del()
	      .catch(function(error) {
	      	console.log("Error**********************");
	        throw {
	          type: 'DatabaseError',
	          message: 'Failed to create test setup data'
	        };
	      });

	    // delete user Svnh from db so it can be created later for the test
	    db.knex('collections')
	      .where('title', '=', 'Angular collection')
	      .del()
	      .catch(function(error) {
	        // uncomment when writing authentication tests
	        throw {
	          type: 'DatabaseError',
	          message: 'Failed to create test setup data'
	        };
	      });

	    // delete user Phillip from db so it can be created later for the test
	    db.knex('links')
	      .where('link_title', '=', 'Link to test collection')
	      .del()
	      .catch(function(error) {
	        // uncomment when writing authentication tests
	        throw {
	          type: 'DatabaseError',
	          message: 'Failed to create test setup data'
	        };
	      });
	});

	describe('When user isn\'t in database: ', function(){

		it("Signup creates a user record", function(done){
			var options = {
				'method': 'POST',
		        'uri': 'http://127.0.0.1:3000/user',
		        'json': {
		          'username': 'test',
		          'password': 'test',
		          'githubHandle': 'handle',
		          'email': '123@gmail.com'
				}
			};

			request(options, function(error, res, body) {
				db.knex('users')
		          .where('username', '=', 'test')
		          .then(function(res) {
		          	if(res[0] && res[0]['username']){
		          		var username = res[0]['username'];
		          		var password = res[0]['password_hash'];
		          		var githubHandle = res[0]['github'];
		          		var email = res[0]['email'];
		          	}
		          	expect(username).to.equal('test');
		          	expect(password).to.equal('test');
		          	expect(githubHandle).to.equal('handle');
		          	expect(email).to.equal('123@gmail.com');
		          	done();
				  });
		    });
		});

	});

	describe('When user is already in database: ', function(){

		beforeEach(function(done){
			new User({'username': 'test',
			          'password_hash': 'test',
			          'github': 'handle',
			          'email': '123@gmail.com'
			      }).save().then(function(){
			      	done();
			      });

		});

		it("Signuped user should be able to be retrieved", function(done){
		    var options = {
		    	'method': 'GET',
		    	'uri': 'http://127.0.0.1:3000/user/test'
		    };

		    request(options, function(error, res, body) {
		    	expect(body).to.include('"username":"test"');
		    	expect(body).to.include('"githubHandle":"handle"');
		    	expect(body).to.include('"email":"123@gmail.com"');
		    	expect(body).to.include('"collections"');
		    	done();
		    });
		});

		it("non-Signuped user should not be able to be retrieved", function(done){
		    var options = {
		    	'method': 'GET',
		    	'uri': 'http://127.0.0.1:3000/user/test2'
		    };

		    request(options, function(error, res, body) {
		    	expect(body).to.equal("User doesn't exist");
		    	done();
		    });
		});

		it("user should not be created twice", function(){
			var options = {
				'method': 'POST',
		        'uri': 'http://127.0.0.1:3000/user',
		        'json': {
		          'username': 'test',
		          'password': 'test',
		          'githubHandle': 'handle',
		          'email': '123@gmail.com'
				}
			};

			request(options, function(error, res, body) {
		    	expect(body).to.equal("User already exists");
		    	done();
		    });
		});
	});

	// describe("Create collections", function(){
		
	// 	beforeEach(function(done){
	// 		new User({'username': 'test',
	// 		          'password_hash': 'test',
	// 		          'github': 'handle',
	// 		          'email': '123@gmail.com'
	// 		      }).save().then(function(){
	// 		      	done();
	// 		      });
	// 	});

	// 	it("user should be able to create a collection", function(){
	// 		var options = {
	// 			'method': 'POST',
	// 	        'uri': 'http://127.0.0.1:3000/collection',
	// 	        'json': {
	// 	          'title': 'Angular collection',
	// 	          'url': 'www.angular.com',
	// 	          'description': 'angular is awesome',
	// 	          'user': 'test',
	// 	          'links': []
	// 			}
	// 		}

	// 		request(options, function(error, res, body) {
	// 			db.knex('collections')
	// 			  .where('title', '=', 'Angular collection')
	// 			  // .join('users', 'collections.u_id', '=', 'users.id')
	// 	          // .select('collections.id', 'collections.title', 'collections.collection_url', 'collections.stars', 'collections.description', 'users.username')
	// 	          .then(function(res) {
	// 	          	if(res[0] && res[0]['title']){
	// 	          		var title = res[0]['title'];
	// 	          		var url = res[0]['collection_url'];
	// 	          		var description = res[0]['description'];
	// 	          		// var username = res[0]['username'];
	// 	          	}
	// 	          	// expect(username).to.equal('test');
	// 	          	expect(title).to.include('bo');
	// 	          	// expect(githubHandle).to.equal('handle');
	// 	          	// expect(email).to.equal('123@gmail.com');
	// 	          	done();
	// 			  });
	// 		});
	// 	});
	// });


});

