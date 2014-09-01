var host = process.env.DBHOST || '127.0.0.1';
var user = process.env.DBUSER || 'root';
var dbpass = process.env.DBPASS || '';
var dbname = process.env.DBNAME || 'curates';

var Bookshelf = require('bookshelf');
var path = require('path');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: host,
    user: user,
    password: dbpass,
    database: dbname,
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username', 64);
      user.string('github', 64);
      user.string('email', 64);
      user.string('password_hash', 255);
      user.timestamps();
    }).then(function(table) {
      console.log('Created User Table', table);
    });
  }
});

db.knex.schema.hasTable('collections').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('collections', function(collection) {
      collection.increments('id').primary();
      collection.integer('u_id'); //references users.id
      collection.string('title', 255);
      collection.string('collection_url', 255).unique();
      collection.string('description', 255);
      collection.integer('stars');
      collection.timestamps();
    }).then(function(table) {
      console.log('Created Collections Table', table);
    });
  }
});

db.knex.schema.hasTable('links').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('links', function(link) {
      link.increments('id').primary();
      link.integer('c_id'); //references collections.id
      link.string('link_url', 255);
      link.string('link_title', 255);
      link.string('description', 255);
      link.integer('click_count').defaultTo(0);
      link.timestamps();
    }).then(function(table) {
      console.log('Created Links Table', table);
    });
  }
});

module.exports = db;
