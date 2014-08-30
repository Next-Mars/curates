var db = require('../dbconfig');
var User = require('./user');
var Link = require('./link');

var Collection = db.Model.extend({
  tableName: 'collections',
  hasTimestamps: true,
  users: function(){
    return this.belongsTo(User, 'u_id');
  },

  links: function(){
    return this.hasMany(Link);
  }
});

module.exports = Collection;
