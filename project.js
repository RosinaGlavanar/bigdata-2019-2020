var generateVehicles = function (count) {
    for (i = 0; i < count; i++) {
        var identifier = ["7458881", "7455889", "7456887", "7457885", "7458884"];
        var model = ['BMW', 'nebmw', 'a', 'l', 't'];
        var numberOfSeats = ["2", "4", "5"]
    }

    db.vehicles.insert({
        Identifier: getRandom(identifier),
        Model: getRandom(model),
        NumberOfSeats: getRandom(numberOfSeats)
    })

    db.vehicles.update({}, {
        $set: {
            model: getRandom(db.vehicles.find())._id
        }
    }, {
        multi: true
    })
}

var generateСargo = function (count) {
    for (i = 0; i < count; i++) {
        var nameOfCargofnames = ['krastavici', 'domati', 'smthelse'];
        var category = ['fruts', 'vegetables', 'meat', 'milkAndDairy', 'smth'];
        var p = ['fruts', 'vegetables', 'meat', 'milkAndDairy']
        var QuantityKG = "+" + Math.random().toString().slice(2, 3);
        var Identificator = "+" + Math.random().toString().slice(2, 7);
var NameOfCargo = getRandom(nameOfCargofnames);
var Category =  getRandom(category);
        db.Cargo.insert({
            NameOfCargo: NameOfCargo,
            Category: Category,
            QuantityKG: QuantityKG,
            Identificator: Identificator
        })
    }

    if( p.includes( Category ) )
    {
        generateСargoP( NameOfCargo, Category );
    }
}

var generateСargoP = function (name , identificator ) {
        db.priorityCargo.insert({
            name: name,
            identificator: identificator
        })
    }
}

var result = []
db.vehicles.find().forEach(function (cargo) {
    result.push({
        NameOfCargo: cargo.Name,
        Category: cargo.Category,
        QuantityKG: cargo.quantityKG,
        Identificator: cargo.Identificator
    })
})
result;

var CargoAndVehicles = function(){
    var result = [];
    db.vehicles.find().forEach(function (CaV) {
        result.push({
            VehiclesName: CaV.name,
            cargo: db.Cargo.find({Identifier: Identificator})
        })
    })
}
