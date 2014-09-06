var app = require('../server');
var request = require('supertest');

describe('GET /index.html', function(){
  it('respond with html', function(done){
    request(app)
    .get('/index.html')
    .set('Accept', 'text/html')
    .expect('Content-Type', /html/)
    .expect(200, done);
  })
});

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

var randomDigit = 100 * Math.random();
var newCollection = {
  "title": "A New Collection"+randomDigit,
  "description": "So many good links",
  "user": {
    "provider": "github",
    "id": "1234",
    "fullName": "John Johnson",
    "givenName": "John"
  },
  "links": [
  {
    "url": "http://www.duck.com",
    "title": "Ducks!",
    "description": "So one might think"
  }
  ]
}

describe('POST /api/collection/create', function(){
  it('respond with json new collection', function(done){

    var  hasTitleLinksDescription = function (res) {
      var response = JSON.parse(res.text);
      newCollection._id = response._id;
      newCollection.url = response.url;
      if (!(response.title && response.title === newCollection.title)) return "missing title";
      if (!(response.links[0].url && response.links[0].url == newCollection.links[0].url)) return "missing links.url";
      if (!(response.description && response.description === newCollection.description)) throw new Error("missing description");
    }

    request(app)
    .post('/api/collection/create')
    .send(newCollection)
    .expect(hasTitleLinksDescription)
    .expect(201, done);
  })
});

describe('POST /api/collection/update', function(){
  newCollection.description += randomDigit;
  it('respond with json updated collection', function(done){
    request(app)
    .post('/api/collection/update')
    .send(newCollection)
    .expect(function (res) {
      var response = JSON.parse(res.text);
      if (!(response.description && response.description === newCollection.description)) return "should return updated Collection with modified description";
    })
    .expect(200, done);
  })
});

describe('POST /api/collection/addlink', function(){
  newCollection.description += randomDigit;
  it('respond with json updated collection with additional link', function(done){
    request(app)
    .post('/api/collection/addlink')
    .send({  
      "_id":newCollection._id,
      "links": [
      {
        "url": "http://www.duckduckgo.com",
        "title": "Real Ducks",
        "description": "Yay"
      }
      ]
    })
    .expect(function (res) {
      var response = JSON.parse(res.text);
      var linkTotal = response.links.length - 1;
      if (!(response.links[linkTotal].description && response.links[linkTotal].description === 'Yay')) return "should return updated Collection with modified link description";
    })
    .expect(200, done);
  })
});

describe('GET /api/collection/:collectionUrl', function(){
  it('respond with json collection found by collection url', function(done){
    request(app)
    .get('/api/collection/'+newCollection.url)
    .expect(function (res) {
      var response = JSON.parse(res.text);
      if (!(response._id && response._id === newCollection._id)) return "should return created Collection";
    })
    .expect(200, done);
  })
});

describe('GET /api/user/:userProvider/:userId', function(){
  it('respond with json all collections by user.id', function(done){
    request(app)
    .get('/api/user/'+newCollection.user.provider+'/'+newCollection.user.id)
    .expect(function (res) {
      var response = JSON.parse(res.text);
      if (!(response.length && response[0].user.id === newCollection.user.id)) return "should return collections created by user";
    })
    .expect(200, done);
  })
});

describe('GET /api/user/NoSuchProvider/NonExistentUser', function(){
  it('respond with json empty array', function(done){
    request(app)
    .get('/api/user/NoSuchProvider/NonExistentUser')
    .expect(function (res) {
      if (!(res.text && res.text === '[]')) return "should return empty array for NonExistentUser";
    })
    .expect(200, done);
  })
});