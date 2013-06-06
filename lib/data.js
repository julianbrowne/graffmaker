

Data = {};
Data.types = {};

Data.types.Timelord = function (name) {
    this.name = name;
    this.type = 'timelord';
}

Data.types.Car = function(make, model, engine, seats) {
    this.make = make;
    this.model  = model;
    this.engine = engine;
    this.seats = seats;
}

exports.types = Data.types;
