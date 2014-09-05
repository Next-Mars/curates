var app = require('../server');
var request = require('supertest');

describe('GET /api/all', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/all')
      .set('Accept', 'application/json')
      .expect(function(res) {
        console.log(res.body);
      })
      .expect(200, done);
  });
});


// Document from supertest:

// .expect(function(res) {})

// Pass a custom assertion function. It'll be given the response object to check. If the response is ok, it should return falsy, most commonly by not returning anything. If the check fails, throw an error or return a truthy value like a string that'll be turned into an error.

// Here the string or error throwing options are both demonstrated:

//   request(app)
//     .get('/')
//     .expect(hasPreviousAndNextKeys)
//     .end(done);

//   function hasPreviousAndNextKeys(res) {
//     if (!('next' in res.body)) return "missing next key";
//     if (!('prev' in res.body)) throw new Error("missing prev key");
//   }