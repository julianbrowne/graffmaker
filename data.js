

Data = {};

Data.types.home = function (name) {
    this.name = name;
    this.type = 'team';
}

Data.types.room = function(name) {
    this.name = name;
    this.type = 'team';
}

Data.types.person = function(firstName, lastName) {
    this.firstname = firstName;
    this.lastName  = lastName;
    this.name = this.first + ' ' + this.lastName;
    this.type = "person";
}

Data.types.device = function (category, name, model) {
    this.name = make;
    this.model = model;
    this.category = category;
    this.type = 'device';
}

exports.types  = Data.types;
