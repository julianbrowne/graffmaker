
var model = require('./lib/models').actions;

var Character = model.define("character");
var Species   = model.define("species");
var Planet    = model.define("planet");

model.createNode(new Character("The Doctor"))
    .then(model.connectTo([{node: new Species("Cybermen"), rel: 'enemy'}]))
    .then(model.connectTo([{node: new Planet("Mondas"),   rel: 'originates'}]));
