
var model = require('./lib/models').actions;

var Car    = new model.define("make", "model", "engine", "seats");
var Person = new model.define("firstName", "lstName");
var Home   = new model.define("name");

new Car('Honda', 'CRV', '2.2', 5);

model.createNode(new Person("John", "Smith"))
    .then(
        model.connectTo([
            { node: new Car('Honda', 'CRV', '2.2', 5), rel: 'drives' },
            { node: new Home("Flat 2B"), rel: 'lives-in' }
        ])
    );
