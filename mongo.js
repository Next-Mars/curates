
// Establish connection with the server
var mongoose = require('mongoose');
mongoose.connect(process.env.CURATES_DB_URI);
var db = mongoose.connection;

// Attach useful listeners to the database
db.on('error', function(error) {
  console.error('Mongoose encountered an error:', error);
});

db.once('open', function() {
  console.log('Mongoose successfully opened connection with the database');
});

// Set up Schema
var collectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: { 
    provider: String, 
    id: String,
    fullName: String,
    givenName: String
  }, required: true },
  description: { type: String, required: true },
  links: [{ url: String, title: String, description: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  stars: { type: Number, default: 0 }
});
var Collection = mongoose.model('Collection', collectionSchema);

// Used to retrieve only these fields in some queries
var metaFields = '_id title url user description stars';

// mongo will be exported. This is the interface for using the database.
var mongo = {};

// An function for mapping a collection title to a url
mongo.mapTitleToUrl = function(title) {
  // These are the allowed charachters, all others are removed
  return title.replace(/[^A-Za-z0-9\-]/g,'').toLowerCase();
};

// Attempts to create a new collection
// If there is already a collection in the db with the same url,
// returns null, else
// Returns a promise
mongo.create = function(coll) {
  // Sets the url if it not already set
  // Should this even be an option? maybe it should require the
  // url to be set here?
  if (!coll.url) {
    coll.url = mongo.mapTitleToUrl(coll.title);
  }
  // Check that url is unique
  return mongo.findByUrl(coll.url).then(function(collection) {
    if (collection) return null;
    return Collection.create(coll);
  });
};

// Attempts to find the collection with the given id
// Returns a promise
mongo.findById = function(id) {
  return Collection.findById(id).exec();
};

// Attempts to find ONE collection by the given title
// Returns a promise
mongo.findByTitle = function(title) {
  return Collection.findOne({ title: title }).exec();
};

// Attempts to find ONE collection with the given url
// There should never be multiple collections with the same url
// Returns a promise
mongo.findByUrl = function(url) {
  return Collection.findOne({ url: url }).exec();
};

// Saves changes of the given collection to the database
// Note: url, title, and user should not be changed, TODO: validate for this?
// Returns a promise that resolves to the new collection
mongo.update = function(collection) {
  // default find by id (fastest)
  if (collection._id) {
    var id = collection._id;
    delete collection._id;
    collection.updatedAt = Date.now();
    return Collection.findByIdAndUpdate(id, collection).exec();
  } else {
    // find by title (mostly to make testing easier)
    collection.updatedAt = Date.now();
    return Collection.findOneAndUpdate(
      {title: collection.title},
      collection
    ).exec();
  }
};

// Returns a promise that resolves to an array of objects, each
// containing the meta data of all the collections in the database
mongo.getAllCollections = function() {
  return Collection.find({}, metaFields).exec();
};

// Returns a promise that resolves to an array of objects, each
// containing the meta data of all the collections created by the 
// given user
mongo.getUserCollections = function(user) {
  return Collection.find({ 
    'user.provider': user.provider, 
    'user.id': user.id 
  }, metaFields).exec();
};





module.exports = mongo;
