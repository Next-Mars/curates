var db = require('../dbconfig');
var Collection = require('./collection');

var Link = db.Model.extend({
  tableName: 'links',
  hasTimestamps: true,

  collections: function(){
    return this.belongsTo(Collection, 'c_id');
  }
});

module.exports = Link;
