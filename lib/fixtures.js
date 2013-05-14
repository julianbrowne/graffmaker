
var utils = require('./utils');

MugWall = {}

MugWall.addPersonToRandomTeam = function(personNode, teams) {

    var teamNode = utils.randomElemFrom(teams);

    personNode.createRelationshipTo(teamNode, 'worksIn');
    console.log(personNode.data.firstName + ' ' + personNode.data.lastName + ' (' + personNode.data.gender + ') works in ' + teamNode.data.name);

    teamNode.createRelationshipTo(personNode, 'hasMember');
    console.log(teamNode.data.name + ' has member ' + personNode.data.firstName + ' ' + personNode.data.lastName + '(' + personNode.data.photoHref + ')');

}

MugWall.errorHandler = function(error, item) {

  if(error) {
    console.error('*** ERROR ' + error + '\n' + (item ? item.toString() : '<undefined>') + '\n\n' );
  }
  else {
    //console.log(item);
    return item;
  }

}

MugWall.teamNames = [ 'Sales', 'Payment', 'Security', 'Finance', 'Service', 'Orders', 'Marketing', 'Despatch', 'Returns', 'Retail', 'Facilities' ];

MugWall.firstNames = [];
MugWall.firstNames['female'] = [ 'Aaliyah', 'Alison', 'Stephanie', 'Deborah', 'Esme', 'Fiona', 'Jessie', 'Jo', 'Katherine', 'Nancy', 'Lauren', 'Cheryl', 'Emilia', 'Kate', 'Lillian', 'Wendy' ];
MugWall.firstNames['male']   = [ 'Barnaby', 'Barney', 'Joel', 'Fred', 'Jeff', 'Cecil', 'James', 'Clive', 'Andrew', 'Harold', 'Raymond', 'Ryan', 'Troy', 'Thomas', 'Stephen' ];
MugWall.lastNames  = [ 'Smith', 'Bailey', 'Carter', 'Hunter', 'Ellis', 'Wood', 'Johnson', 'Edwards', 'Harrison', 'Graham', 'Wood', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson' ];

exports.addPersonToRandomTeam = MugWall.addPersonToRandomTeam
exports.errorHandler          = MugWall.errorHandler
exports.firstNames            = MugWall.firstNames
exports.lastNames             = MugWall.lastNames
exports.teamNames             = MugWall.teamNames