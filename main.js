
/**
 *  Graffmaker
**/

(function() {

  var model   = require('./lib/model').actions;
  var connect = require('./lib/model').connect;

  exports.connect     = connect;
  exports.createNode  = model.createNode;
  exports.connectTo   = model.connectTo;
  exports.connectFrom = model.connectFrom;
  exports.define      = model.define;

}).call(this);
