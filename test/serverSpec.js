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

	describe('Create user', function(){

		it("Signup creates a user record", function(){
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
		          		var password = res[0]['password'];
		          		var githubHandle = res[0]['githubHandle'];
		          		var email = res[0]['email'];
		          	}
		          	expect(username).to.equal('test1');
		          	expect(password).to.equal('test1');
		          	expect(githubHandle).to.equal('handle');
		          	expect(email).to.equal('123@gmail.com');
		          	done();
				  }).catch(function(err){
				  	throw{
		  	            type: 'DatabaseError',
			            message: 'Failed to create test setup data'
			        }
				  });
		    });
		});

		// it("Signuped user should be able to be retrieved", function(){
		//     var options = {
		//     	'method': 'GET',
		//     	'uri': 'http://127.0.0.1:3000/user/test'
		//     };

		//     request(options, function(error, res, body) {
		//     	console.log('what is the res: ', res);
		//     	expect(body).to.include('"username":"test", "hubHandle":"handle"');
		//     	expect(body).to.include('"username":"test"');
		//     	done();
		//     });
		// });
	});

	describe("Create collections", function(){

	})


});

