
var neo = require('neo4j');
var db  = new neo.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

var Model = {}

/**
 *  Model util functions
**/

Model.utils = {}

Model.utils.mapIndexQueryResult  = function(nodes) { console.log("--- Index Search Result: " + nodes.length); return nodes.map(function (node) { return node.data; }); }

Model.utils.mapCypherQueryResult = function(nodes) { console.log("--- Cypher Query Result: " + nodes.length); return nodes.map(function (node) { return node['member']; }); }

Model.utils.processQueryResult   = function(callback, processor) {

    return function(error, results) {
        if (error) {
            console.error('*** Error : ' + error);
            callback([]);
        }
        else {
            var nodes = processor(results);
            callback(nodes);
        }
    }
}

/**
 *  Models
**/

Model.teams = {};

Model.teams.all = function(callback) {
    db.getIndexedNodes('teamIndex', 'type', 'team', Model.utils.processQueryResult(callback, Model.utils.mapIndexQueryResult));
}

Model.people = {}

Model.people.getByTeam = function(team, callback) {

    var cypher = [
        "START n=node:teamIndex(name={team})",
        "MATCH n-[hasMember]-member",
        "RETURN member"
    ].join("\n");

    var params = { team: team };

    db.query(cypher, params, Model.utils.processQueryResult(callback, Model.utils.mapCypherQueryResult) );
}

exports.teams  = Model.teams
exports.people = Model.people
