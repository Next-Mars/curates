var mongo = require('./mongo');
var express = require('express');
var session = require('express-session');
var url = require('url');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 3000;

app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(session({
  secret: "bob the builder"
}));

//serve static files in client when referred to in html
app.use(express.static(__dirname + '/client'));

// add new collection endpoint
// responds with null if collection can't be added
app.post('/api/collection/create', function(req, res) {
  mongo.create(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// update collection endpoint
// responds with the updated collection
app.post('/api/collection/update', function(req, res) {
  mongo.update(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// retrieve a collection by url
app.get('/api/collection/:url', function(req, res) {
  mongo.findByUrl(req.params.url).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// retrieve the meta data for all of a users collections
app.get('/api/user/:userProvider/:userId', function(req, res) {
  var user = {
    provider: req.params.userProvider,
    id: req.params.userId
  };
  mongo.getUserCollections(user).then(function(collections) {
    res.end(JSON.stringify(collections));
  });
});

// retrieve the meta data for all collections
app.get('/api/all', function(req, res) {
  mongo.getAllCollections().then(function(collections) {
    res.end(JSON.stringify(collections));
  });
});

// route all other requests to the main page
app.use(function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// start the server
app.listen(port, function() {
  console.log('listening on', port);
});
