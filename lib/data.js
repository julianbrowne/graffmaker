

Data = {};
Data.types = {};

Data.types.Home = function (name) {
    this.name = name;
    this.type = 'home';
}

Data.types.Room = function(name) {
    this.name = name;
    this.type = 'room';
}

Data.types.Person = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.name = this.firstName + ' ' + this.lastName;
    this.type = "person";
}

Data.types.Device = function (category, make, model) {
    this.make = make;
    this.model = model;
    this.name = this.make + ' ' + this.model;
    this.category = category;
    this.type = 'device';
}

Data.types.Gas = function(name) {
    this.name = name;
    this.type = 'gas';
}

Data.types.Electricity = function(name) {
    this.name = name;
    this.type = 'electricity';
}

Data.types.DuelFuel = function(name) {
    this.name = name;
    this.type = 'duel-fuel';
}

exports.types = Data.types;
