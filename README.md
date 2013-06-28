
##Graffmaker

Simple data generation partner tool for Graffeine. Creates simple graph structures for testing in Neo4J.

###Using Graffmaker

####Include Library

Include the models library: 

    var model = require('./lib/models').actions;

####Defines "Types"

Define the node structures you want to use:

    var Car    = new model.define("make", "model", "engine", "seats");
    var Person = new model.define("firstName", "lstName");
    var Home   = new model.define("name");

This is so you can do this kind of OO thing later:

	new Car('Honda', 'CRV', '2.2', 5);

####Make Nodes and Relationships
	
Now we can actually populate Neo4J with some data:

    model.createNode(new Person("John", "Smith"))
        .then(
            model.connectTo([
                { node: new Car('Honda', 'CRV', '2.2', 5), rel: 'drives' },
                { node: new type.Home("Flat 2B"), rel: 'lives-in' }
            ])
        );

This entire example can be found in the example-1.js file
    
Graph connections can be chained, with the last node created (the Home in the example above), being passed to the next 'then' clause.

Relationships work both ways so

	model.connectTo()

joins the previously created node to the current one and

	model.connectFrom()

joins the current node to the previous

Both model.connectTo and model.connectFrom take an array of objects of the form (node: …, rel: …} where node is the graph node data and rel is the relationship required between this one and the previous. It's therefore entirely acceptable to skip the pseudo OO step above and simply call:

	model.createNode({name: 'Dr Who', type: 'timelord'})
    	.then(model.connectTo([{node: {name: 'cybermen', type: 'cyborg' }, rel: 'enemy'}]))
    	.then(model.connectTo([{node: {name: 'Mondas', type: 'planet' }, rel: 'originates'}]));

To actually do the population first make sure Neo4J is running (lib/models.js expects it to be local machine) and then simply run:

    node {your_js_file}

