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

	    // delete user Svnh from db so it can be created later for the test
	    db.knex('collections')
	      .where('title', '=', 'collection owned by test')
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

	describe('New user: ', function(){

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
		          	console.log(res);
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

	describe('Retrieve a user: ', function(){

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
	});

	describe("Create collections", function(){
		
	})


});

