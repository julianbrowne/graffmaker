
var neo  = require('neo4j');
var rsvp = require('rsvp');
var util = require('util');

var Connection = function(connectionString) {

    this.defaultConnString = process.env.NEO4J_URL || 'http://localhost:7474';
    this.connectionString  = (connectionString===""||connectionString===null||connectionString===undefined) ? this.defaultConnString : connectionString;
    this.db = new neo.GraphDatabase(this.connectionString);

    this.createNode = function(data) {
        var promise = new rsvp.Promise();
        var node = this.db.createNode(data);
        node.save(function(error, node) {
            if(error) {
                console.log("ERROR : " + util.inspect(error) );
                promise.reject(error);
            }
            else {
                promise.resolve(node);
            }
        });
        return promise;
    };

    this.connectTo = function(nodeRels) {
        return function(nodeSource) {
            var promise = new rsvp.Promise();
            nodeRels.forEach(function(nodeRel) {
                var nodeTarget = this.db.createNode(nodeRel.node);
                nodeTarget.save(function(error, node) {
                    if(error) {
                        console.log("ERROR : " + util.inspect(error) );
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

    this.connectFrom = function(nodeRels) {
        return function(nodeSource) {
            var promise = new rsvp.Promise();
            nodeRels.forEach(function(nodeRel) {
                var nodeTarget = this.db.createNode(nodeRel.node);
                nodeTarget.save(function(error, node) {
                    if(error) {
                        console.log("ERROR : " + util.inspect(error) );
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

    this.define = function() {
        var keys = Array.prototype.slice.call(arguments);
        return function() {
            var values = Array.prototype.slice.call(arguments);
            var node = this;
            keys.forEach(function(key) {
                var index = keys.indexOf(key);
                node[key] = values[index];
            });
        };
    };

};

/**
 *  Exports
**/

exports.connect = Connection;
