var express = require('express');
var session = require('express-session');
var url = require('url');
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
      var u_id = user.get('id');
      collectionToBeSavedOrUpdated.u_id = u_id;

      dbUtils.collectionExists(collectionToBeSavedOrUpdated,
        function(collection_id) {
          collectionToBeSavedOrUpdated.id = collection_id;
          console.log("i am the collection: ", collectionToBeSavedOrUpdated);
          new Collection(collectionToBeSavedOrUpdated)
            .save()
            .then(function(collection) {
              console.log("Saved collection: ", collection);
              var c_id = collection.get('id');
              console.log("this is the c_id: ", c_id);
              linksToBeSaved.forEach(function(linkObj) {
                dbUtils.linkExistsInSpecificCollection(linkObj, c_id, function(link_id) {
                  new Link({
                    id: link_id,
                    c_id: c_id,
                    link_url: linkObj.url,
                    link_title: linkObj.title,
                    description: linkObj.description
                  })
                    .save()
                    .then(function(link) {
                      console.log("successfully saved links: ");
                    })
                })
              })
            })
        });
    });

  res.end("post received");
});

//updating an existing collection

app.post('/collection/:collectionID', function(req, res) {
  var collectionID = req.params.collectionID
  var data = req.body;
  console.log("data   ", data);
  var collectionFieldsToUpdate = {};

  for (var k in data) {
    if (typeof data[k] === 'string' && k !== 'url') { // need to escape links array as irrevalnt to COLLECTIONS update
      // also escape data.url as we do not want to update a collection's url
      collectionFieldsToUpdate[k] = data[k];
    }
  }
  console.log("collectionFields Update: ", collectionFieldsToUpdate);
  //function to updateCollections

  new Collection({
    id: collectionID
  }).save(collectionFieldsToUpdate, { //accounts for scenarios when user is updating meta data of links
    patch: true // patch just updates the Collection Entry with what is CollectionFieldsToUpdate
  }).then(function(collectionUpdated) {
    if (data.links) {
      data.links.forEach(function(linkObj) {
        var url = linkObj.url;
        var linkToBeUpdatedOrSaved = {
          link_url: linkObj.url,
          link_title: linkObj.title,
          description: linkObj.description,
          c_id: collectionID
        };
        dbUtils.linkExistsInSpecificCollection(url, collectionID, function(l_id) {
          linkToBeUpdatedOrSaved.id = l_id;
          new Link(linkToBeUpdatedOrSaved)
            .save()
            .then(function(link) {
              console.log("successfully updated link: ", link);
            })
        });
      });
    }
    //need to refactor below to deal with asynchronous save
    console.log("xxxx about to post end");
    res.end("successfully posted");
  })
})

//create  a new user

app.post('/user', function(req, res) {
  var data = req.body;
  var userToBeSaved = {
    username: data.username,
    github: data.githubHandle,
    email: data.email,
    password_hash: data.password // in future will hash passwords before saving
  };
  dbUtils.userExists(userToBeSaved, function(u_id) {
    userToBeSaved.id = u_id;
    new User(userToBeSaved)
      .save()
      .then(function(user) {
        console.log("successfully SAVED USER into db: ", user);
        res.end(JSON.stringify({
          id: user.id
        }));
      })
  });
});

app.get('/user/:username/:collection', function(req, res) {
  var url = req.path;
  var username = url.slice(url.indexOf("/", 1) + 1, url.lastIndexOf("/"));

  var data;
  new Collection({
    collection_url: url
  })
    .fetch()
    .then(function(result) {
      var collection = result.attributes;
      data = {
        title: collection.title,
        url: collection.collection_url,
        description: collection.description,
        user: username,
        stars: collection.stars
      };
      new Link()
        .query('where', 'c_id', '=', collection.id)
        .fetchAll()
        .then(function(collectionFound) {
          data.links = collectionFound;
          res.send(JSON.stringify(data));
        })
        .catch(function(err) {
          console.error(err);
          res.end(404)
        })
    })
    .catch(function(err) {
      console.error(err);
      res.end(404)
    })

});

app.get('/user/:user', function(req, res) {
  // console.log("this is FOR BO req params ", req.params);
  var url = req.path;
  var username = url.slice(url.indexOf("/", 1) + 1);
  var userToBefetched = {
    username: username
  };
  new User({
    username: username
  })
    .fetch()
    .then(function(fetchedUser) {
      if (fetchedUser) {
        result = {
          username: fetchedUser.attributes.username,
          githubHandle: null,
          email: null,
          collections: []
        }
        var user_id = fetchedUser.get('id');
        new Collection()
          .fetchAll({
            u_id: user_id
          })
          .then(function(collection_list) {
            for (var i = 0; i < collection_list.models.length; i++) {
              var thisCollection = collection_list.models[i].attributes;
              var eachCollection = {
                title: thisCollection.title,
                url: thisCollection.collection_url,
                description: thisCollection.description,
                user: username,
                stars: thisCollection.stars,
              };
              result.collections.push(eachCollection);
            }
            res.end(JSON.stringify(result));
          });
      } else {
        res.status(404).send(404, "User doesn't exist");
      }
    });
});

// route to get all collection from database
app.get('/all', function(req, res) {
  db.knex('collections')
    .join('users', 'collections.u_id', '=', 'users.id')
    .select('users.username', 'collections.title', 'collections.collection_url', 'collections.stars', 'collections.description')
    .then(function(joinTable) {
      var data = {
        collections: joinTable
      };
      res.end(JSON.stringify(data));
    })
});
//catchall route, serve index.html, leave further routing to angular
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
});

console.log('Curates is listening on ' + port);
app.listen(port);
