
var neo  = require('neo4j');
var db   = new neo.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');
var util = require('util');
var seq  = require('./step');

var Model = {}

/**
 *  Simple model functions
**/

Model.actions = {}

Model.actions.createNode = function(data, callback) {
    var node = db.createNode(data);
    node.save(Model.utils.nodeErrorHandler(callback));
};

Model.actions.builder = function() {
    return new Model.actions.generator();
};

Model.actions.generator = function() {

    this.obj  = null;
    this.args = null;
    this.node = null;

    this.make = function(obj) {
        this.obj = obj;
        return this;
    }

    this.using = function() {
        this.args=arguments;
        return this;
    }

    this.construct = function(constructor, args) {
        function F() { return constructor.apply(this, args); }
        F.prototype = constructor.prototype;
        return new F();
    }

    this.create = function(callback) {
        var data = this.construct(this.obj, this.args);
        var node = db.createNode(data);
        var gen  = this;
        node.save(function(err, node) {
            if(err) throw err;
            gen.node = node;
            if(callback !== undefined)
                callback(node);
        });
        return this;
    }

    this.linkTo = function(otherNode, rel) {
        this.node.createRelationshipTo(otherNode, rel, {}, function(err, res) { if(err) throw err; });
        return this;
    }

    this.linkFrom = function(otherNode, rel) {
        this.node.createRelationshipFrom(otherNode, rel, {}, function(err, res) { if(err) throw err; });
        return this;
    }

}

Model.actions.findNode = function(id, callback) {
    db.findNodeById(id, Model.utils.nodeErrorHandler(callback))
};

Model.actions.linkNodes = function(nodeSource, nodeTarget, relationship) {
    nodeSource.createRelationshipTo(nodeTarget, relationship);
}

/**
 *  Model util functions
**/

Model.utils = {}

Model.utils.nodeErrorHandler = function(callback) {
    return function(error, node) {
        if(error)
            util.error(error);
        else {
            //util.log("Created node " + util.inspect(node.data));
            if(node.data.name !== undefined) {
                node.index('nodeIndex', 'name', node.data.name);
            }
            if(callback !== undefined) {
                callback(node);
            }
        }
    }
};

Model.utils.randomNumber = function(max) { return Math.floor(Math.random()*max) }
Model.utils.randomElemFrom = function(elements) { return elements[ Model.utils.randomNumber(elements.length) ]; }

/**
 *  Exports
**/

exports.actions = Model.actions
exports.utils   = Model.utils
