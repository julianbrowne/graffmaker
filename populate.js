
var model = require('./lib/models').actions;
var type  = require('./lib/data').types;

model.createNode({name: 'Dr Who', type: 'timelord'})
    .then(model.connectTo([{node: {name: 'cybermen', type: 'cyborg' }, rel: 'enemy'}]))
    .then(model.connectTo([{node: {name: 'Mondas', type: 'planet' }, rel: 'originates'}]));

