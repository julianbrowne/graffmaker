
var neo  = require('neo4j');
var db   = new neo.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');
var util = require('util');
var rsvp = require('rsvp');

var Model = {}

/**
 *  Simple model functions
**/

Model.actions = {}

Model.actions.createNode = function(data) {
    var promise = new rsvp.Promise();
    var node = db.createNode(data);
    node.save(function(error, node) {
        if(error) {
            promise.reject(error);
        }
        else {
            promise.resolve(node);
        }
    });
    return promise;
};

Model.actions.connectTo = function(nodeRels) {
    return function(nodeSource) {
        var promise = new rsvp.Promise();
        nodeRels.forEach(function(nodeRel) {
            var nodeTarget = db.createNode(nodeRel.node);
            nodeTarget.save(function(error, node) {
                if(error) {
                    promise.reject(error);
                }
                else {
                    nodeSource.createRelationshipTo(nodeTarget, nodeRel.rel);
                    promise.resolve(node);
                }
            });
        });
        return promise;
    };
};

Model.actions.connectFrom = function(nodeRels) {
    return function(nodeSource) {
        var promise = new rsvp.Promise();
        nodeRels.forEach(function(nodeRel) {
            var nodeTarget = db.createNode(nodeRel.node);
            nodeTarget.save(function(error, node) {
                if(error) {
                    promise.reject(error);
                }
                else {
                    nodeTarget.createRelationshipTo(nodeSource, nodeRel.rel);
                    promise.resolve(node);
                }
            });
        });
        return promise;
    };
};

/**
 *  Exports
**/

exports.actions = Model.actions
exports.utils   = Model.utils
