var express = require('express');
var session = require('express-session');

var bodyParser = require('body-parser');
var dbUtils = require('./server/utils/dbUtils');

var db = require('./server/dbconfig');
var User = require('./server/models/user');
var Link = require('./server/models/link');
var Collection = require('./server/models/collection');
var cookieParser = require('cookie-parser');

app = express();

//probably uneeded b/c templates generated client side
// var partials = require('express-partials');
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// // app.use(partials());

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

//routes for restful endpoint, response with JSON data queried from db

// creating a new collection with new urls;
app.post('/collection', function(req, res) {

  //need to check if user is signed in/authorised;

  var data = req.body;

  var collectionToBeSavedOrUpdated = {
    c_id: 1,
    u_id: 0,
    title: data.title,
    collection_url: data.url,
    description: data.description,
    stars: 0
  };

  var linksToBeSaved = data.links; //array of link objects each { url: url, description: description, title: title}
  //fetch the user and the user id
  new User({
    username: data.user
  })
    .fetch()
    .then(function(user) {
      // if user doesn't exists

      // if user exists
      var u_id = user.get('u_id');
      collectionToBeSavedOrUpdated.u_id = u_id;

      dbUtils.collectionExists(collectionToBeSavedOrUpdated,
        function(c_id) {
          // var params;
          // if (options.method === 'save') {
          //   params = null;
          // } else if (options.method === 'update') {
          //   params = {
          //     collection_url: collectionToBeSavedOrUpdated.collection_url
          //   }
          // }
          collectionToBeSavedOrUpdated.id = c_id;
          console.log("i am the collection: ", collectionToBeSavedOrUpdated);
          new Collection(collectionToBeSavedOrUpdated)
            .save()
            .then(function(collection) {
              console.log("Saved collection: ", collection);
              var c_id = collection.get('id');
              console.log("this is the c_id: ", c_id);
              linksToBeSaved.forEach(function(linkObj) {
                new Link({
                  c_id: c_id,
                  link_url: linkObj.url,
                  link_title: linkObj.title,
                  description: linkObj.description,
                  click_count: 0
                })
                  .save()
                  .then(function(link) {
                    console.log("successfully saved links: ");
                  })
              })
            })
        });
    });

  res.end("post received");
})

//catchall route, serve index.html, leave further routing to angular
app.get('/*', function(req, res) {
  console.log("received get for /");
  res.sendFile(__dirname + '/client/index.html')
})

console.log('Curates is listening on 3000');
app.listen(3000);
