
var model = require('./lib/models').actions;
var type  = require('./lib/data').types;
var util  = require('util');
var seq   = require('./lib/step');

function linkFrom(nodeTarget, relationship, cb) {
    return function(nodeSource) {
        model.linkNodes(nodeTarget, nodeSource, relationship);
        if(cb!==undefined) cb(nodeSource);
    }
}

function linkTo(nodeTarget, relationship, cb) {
    return function(nodeSource) {
        model.linkNodes(nodeSource, nodeTarget, relationship);
        if(cb!==undefined) cb(nodeSource);
    }
}

var builder = model.builder();

seq.step(

    function() {
        model.builder().make(type.Person).using("John","Smith").create(this);
    },

    function(person) {
        model.builder().make(type.Gas).using("Gas #231").create(linkFrom(person, 'holds-account'));
        model.builder().make(type.Home).using("Home 1").create(linkFrom(person, 'owns-property', this));
    },

    function(property) {
        builder.make(type.Room).using("Living Room").create(linkFrom(property, 'contains', this));
        builder.make(type.Room).using("Kitchen").create(linkFrom(property, 'contains'));
        builder.make(type.Room).using("Main Bedroom").create(linkFrom(property, 'contains'));
        builder.make(type.Room).using("Nursery").create(linkFrom(property, 'contains'));
        builder.make(type.Room).using("Study").create(linkFrom(property, 'contains'));
    },

    function(room) {
        builder.make(type.Device).using("Thermostat", "AlertMe", "Emporer").create(linkTo(room, 'installed-in'));
    }
);

seq.step(
    function() { model.createNode(new type.Person("Brian", "Jones"), this); },
    function(person) {
        model.createNode(new type.Gas("Elec #652"), linkFrom(person, 'holds-account'));
        model.createNode(new type.Home("Flat 2B"), linkFrom(person, 'owns-property', this));
    },
    function(property) {
        model.createNode(new type.Room("Hall"), linkFrom(property, 'contains'));
        model.createNode(new type.Room("Kitchen"), linkFrom(property, 'contains'));
        model.createNode(new type.Room("Master Bedroom"), linkFrom(property, 'contains'));
        model.createNode(new type.Room("Spare Bedroom"), linkFrom(property, 'contains'));
        model.createNode(new type.Room("Dining Room"), linkFrom(property, 'contains', this));
    },
    function(room) {
        model.createNode(new type.Device("Thermostat", "Nest", "3.5"), linkTo(room, 'installed-in'));
    }
);
