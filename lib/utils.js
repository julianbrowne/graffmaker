
Utils = {};

Utils.randomNumber = function(max) { return Math.floor(Math.random()*max) }
Utils.randomElemFrom = function(elements) { return elements[ Utils.randomNumber(elements.length) ]; }

exports.randomNumber    = Utils.randomNumber
exports.randomElemFrom  = Utils.randomElemFrom
