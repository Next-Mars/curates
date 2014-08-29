var db = require('../dbconfig');
var Collection = require('./collection');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  collections: function(){
    return this.hasMany(Collection);
  }
});

module.exports = User;
