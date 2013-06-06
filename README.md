
##Graffinit

Simple data generation partner tool for Graffeine. Creates simple graph structures for testing in Neo4J.

###Using Graffinit

edit the lib/data.js file to create the required node types.

e.g.

    Data.types.Car = function(make, model, engine, seats) {
        this.make = make;
        this.model  = model;
        this.engine = engine;
        this.seats = seats;
    }

This is only so you can do this OO kind of thing later:

	new type.Car('Honda', 'CRV', '2.2', 5);
	
Edit populate.js to actually populate Neo4J with some data

    model.createNode(new type.Person("John", "Smith"))
        .then(
            model.connectTo([
                { node: new Car('Honda', 'CRV', '2.2', 5), rel: 'drives' },
                { node: new type.Home("Flat 2B"), rel: 'lives-in' }
            ])
        )
    
Graph connections can be chained, with the last node created (the Home in the example above), being passed to the next 'then' clause.

Relationships work both ways so

	model.connectTo()

joins the previously created node to the current one and

	model.connectFrom()

joins the current node to the previous

Both model.connectTo and model.connectFrom take an array of objects of the form (node: …, rel: …} where node is the graph node data and rel is the relationship required between this one and the previous. It's therefore entirely acceptable to skip the Data.types step above and simply call:

	model.createNode({name: 'Dr Who', type: 'timelord'})
    	.then(model.connectTo([{node: {name: 'cybermen', type: 'cyborg' }, rel: 'enemy'}]))
    	.then(model.connectTo([{node: {name: 'Mondas', type: 'planet' }, rel: 'originates'}]));

This example is included in the file populate.js

To actually do the population first make sure Neo4J is running (lib/models.js expects it to be local machine) and then simply run:

    node populate

