var Bookshelf = require('bookshelf');
var path = require('path');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'curates',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/curates.sql')
  }
});

var db = require('bookshelf')(knex);


db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('u_id').primary();
      user.string('username', 64);
      user.string('github', 64);
      user.string('email', 64);
      user.string('password_hash', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created User Table', table);
    });
  }
});


db.knex.schema.hasTable('collections').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('collections', function (collection) {
      collection.increments('c_id').primary();
      collection.integer('u_id');
      collection.string('title', 255);
      collection.string('collection_url', 255)
      collection.string('description', 255);
      collection.integer('stars');
      collection.timestamps();
    }).then(function (table) {
      console.log('Created Collections Table', table);
    });
  }
});

db.knex.schema.hasTable('links').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('links', function (link) {
      link.increments('l_id').primary();
      link.integer('c_id');
      link.string('link_url', 255);
      link.string('link_title', 255);
      link.string('description', 255);
      link.integer('click_count');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Links Table', table);
    });
  }
});

// //join table, many to many relationship between collections and links
// db.knex.schema.hasTable('links_collections').then(function (exists) {
//   if (!exists) {
//     db.knex.schema.createTable('links_collections', function (linkCollection) {
//       linkCollection.increments('LC_id').primary();
//       linkCollection.integer('c_id');
//       linkCollection.integer('l_id');
//       linkCollection.string('description', 255);
//       linkCollection.integer('click_count');
//     }).then(function(table){
//       console.log("Created Links-Collections table ", table);
//     });
//   }
// });


module.exports = db;

