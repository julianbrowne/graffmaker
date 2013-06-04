
var neo   = require('neo4j');
var mw    = require('./lib/fixtures');
var utils = require('./lib/utils');
var obj   = require('./data');

var db = new neo.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

/**
 *  Add nodes to Neo
**/

lgr = function(e,n) {
    if(e)
        throw(e);
    else {
        console.log(n.data);

        n.index('nodeIndex', 'name', n.data.name);

        var cypher = [
            "START n=node(*)",
            "RETURN n;"
        ].join("\n");

        db.query(cypher, {}, function(e, r) {
            var items = [];
            if(r) {
                r.map(function(i){ items.push(i['n']); });
                console.log('node count => ' + items.length);
            }
        });
    }
};

db.createNode(new obj.model.Person("John",  "Smith")).save(lgr);
db.createNode(new obj.model.Person("Brian", "Jones")).save(lgr);

db.createNode(new obj.model.Home("Home")).save(lgr);
db.createNode(new obj.model.Home("Home")).save(lgr);
db.createNode(new obj.model.Home("Home")).save(lgr);

db.createNode(new obj.model.Room("Living Room")).save(lgr);
db.createNode(new obj.model.Room("Kitchen")).save(lgr);
db.createNode(new obj.model.Room("Bedroom")).save(lgr);

db.createNode(new obj.model.Room("Living Room")).save(lgr);
db.createNode(new obj.model.Room("Study")).save(lgr);

db.createNode(new obj.model.Room("Living Room")).save(lgr);
db.createNode(new obj.model.Room("Dining Room")).save(lgr);

db.createNode(new obj.model.Gas("Gas Acc.")).save(lgr);
db.createNode(new obj.model.Electricity("Elec. Acc.")).save(lgr);
db.createNode(new obj.model.DuelFuel("Duel Fuel")).save(lgr);

db.createNode(new obj.model.Device("Thermostat", "AlertMe", "Emporer")).save(lgr);
db.createNode(new obj.model.Device("Thermostat", "Nest", "3.5")).save(lgr);
db.createNode(new obj.model.Device("Humidity", "XBee", "ZB")).save(lgr);
