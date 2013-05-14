
var neo   = require('neo4j');
var mw    = require('./lib/fixtures');
var utils = require('./lib/utils');
var types = require('./data');

var db = new neo.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

/**
 *  Add team nodes to Neo
**/

var teamNodes = [];

for(var i=0; i< grpsToCreate; i++) {

    var teamNode = db.createNode({ name: MugWall.teamNames[i], type: 'team'});

    teamNode.save(function(err, team) {
        if(!err) {
            teamNodes.push(team);
            team.index('teamIndex', 'name', team.data.name, mw.errorHandler );
            team.index('teamIndex', 'type', team.data.type, mw.errorHandler );
        } else {
            console.error('*** ERROR: ' + err);
        }
    });

}

/**
 *  Create Mugs and assign to random team
**/

for(var i=0; i<mugsToCreate; i++) {

    var gender = utils.randomElemFrom(['male', 'female']);

    var personNode = db.createNode({
        type: 'person',
        firstName: utils.randomElemFrom(mw.firstNames[gender]),
        lastName:  utils.randomElemFrom(mw.lastNames),
        gender:    gender,
        photoHref: '/assets/photos/' + gender + '-' + Math.floor(Math.random()*17) + '.jpg'
    });

    personNode.save(function(e, p){
        if(!e) {
            mw.addPersonToRandomTeam(p, teamNodes);
            p.index('peopleIndex', 'firstName', p.data.firstName);
            p.index('peopleIndex', 'lastName',  p.data.lastName);
        } else {
            console.error('*-* ERROR: ' + e);
        }
    });

}