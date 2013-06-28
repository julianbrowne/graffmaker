
var model = require('./lib/model').actions;

var Person = new model.define("firstName", "lastName");
var Home = new model.define("name");
var Room = new model.define("name");

var p1 = new Person("Alan", "Turing");
var p2 = new Person("Brian", "Jones");
var p3 = new Person("Ian", "Curtis");
var p4 = new Person("Tommy", "Flowers");

var h1 = new Home("Alan's House");
var h2 = new Home("Another House");
var h3 = new Home("A Smart Flat");
var h4 = new Home("Holiday Home");
var h5 = new Home("Caravan");

var r1 = new Room("Kitchen");
var r2 = new Room("Dining Room");
var r3 = new Room("Hall");
var r4 = new Room("Bedroom");
var r5 = new Room("Basement");

model.createNode(p1)
    .then(model.connectTo([
        {node: h2, rel: 'rents out'},
        {node: h3, rel: 'covets'},
        {node: h1, rel: 'lives in'}
    ]))
    .then(model.connectTo([
        {node: r1, rel: 'contains'},
        {node: r2, rel: 'contains'},
        {node: r3, rel: 'contains'},
        {node: r4, rel: 'contains'}
    ]));

model.createNode(p2);
model.createNode(p3);
model.createNode(p4);
model.createNode(h4);
model.createNode(h5);
