
var model = require('./lib/models').actions;
var type  = require('./lib/data').types;
var util  = require('util');

model.createNode(new type.Person("Brian", "Jones"))
    .then(
        model.connectTo([
            { node: new type.Gas("Acc #123"), rel: 'holds-account' },
            { node: new type.Home("Flat 2B"), rel: 'owns-property' }
        ])
    )
    .then(
        model.connectTo([
            { node: new type.Room("Hall"),        rel: 'contains' },
            { node: new type.Room("Kitchen"),     rel: 'contains' },
            { node: new type.Room("Bedroom"),     rel: 'contains' },
            { node: new type.Room("Dining Room"), rel: 'contains' },
            { node: new type.Room("Living Room"), rel: 'contains' }
        ])
    )
    .then(
        model.connectFrom([
            { node: new type.Device("Thermostat", "Nest", "3.5"), rel: 'installed-in' }
        ])
    )
    .then(null, function(error) { console.log(error) });
