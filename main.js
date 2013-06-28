
/**
 *  Graffmaker
**/

(function() {

  var model = require('./lib/model').actions;

  exports.createNode  = model.createNode;
  exports.connectTo   = model.connectTo;
  exports.connectFrom = model.connectFrom;
  exports.define      = model.define;

}).call(this);
