var generatEmployees = function (count) {
    for (i = 0; i < count; i++) {
        var posts = ["owner", "risk director", "financial analyst", "managing director", "trader",
            "boss accountant", "branch manager", "bank tellers"
        ];
        var departments = ["unicredit", "dsc", "international"];
        var fnames = ['Mihail', 'Ivan', 'Serioja', 'Nikola', 'Vladimir', 'Anastasija', 'Ekaterina'];
        var snames = ['Petrov', 'Ivanov', 'Jozik', 'Toskov', 'Putin', 'Kozareva', 'Velika'];
        var lnames = ['Antonovich', 'Afanasievich', 'Andreevich', 'Vladimirovich', 'Egorovich', 'Ivanovich', 'Petrovich'];
        var adresses = ['asd 551', 'qwe 422', 'adxc 33', 'vfdsx 14', 'qqq 5', 'qe 11', 'dsa 52'];
        var country = ['Bulgaria', 'Russia', 'Ukraine', 'Moldova'];

        var phoneNumber = "+" + Math.random().toString().slice(2, 15);;
        var email = Math.random().toString(36).substring(2, 11) + '@mail.ru'
        var salary = Math.floor(Math.random() * (10000 - 1300 + 1)) + 1300;
        var experience = Math.floor(Math.random() * (50 - 0 + 1)) + 0;

        db.employees.insert({
            FName: getRandom(fnames),
            SName: getRandom(snames),
            LName: getRandom(lnames),
            adress: getRandom(adresses),
            country: getRandom(country),
            phoneNumber: phoneNumber,
            email: email,
            salary: salary,
            experience: experience,
            position: getRandom(posts),
            department: getRandom(departments),
            departmentHistory: getСareer(),
            fired: Math.random() >= 0.5,
            motherhood: Math.random() >= 0.5,
            leave: Math.random() >= 0.5
        })
    }

    db.employees.update({}, {
        $set: {
            boss: getRandom(db.employees.find())._id
        }
    }, {
        multi: true
    })
}

var generateСustomers = function (count) {
    for (i = 0; i < count; i++) {
        var fnames = ['Mihail', 'Ivan', 'Serioja', 'Nikola', 'Vladimir', 'Anastasija', 'Ekaterina'];
        var snames = ['Petrov', 'Ivanov', 'Jozik', 'Toskov', 'Putin', 'Kozareva', 'Velika'];
        var lnames = ['Antonovich', 'Afanasievich', 'Andreevich', 'Vladimirovich', 'Egorovich', 'Ivanovich', 'Petrovich'];
        var adresses = ['asd 551', 'qwe 422', 'adxc 33', 'vfdsx 14', 'qqq 5', 'qe 11', 'dsa 52'];
        var currency = ['BG', 'UAH', 'USD', 'EUR'];

        var phoneNumber = "+" + Math.random().toString().slice(2, 11);
        var email = Math.random().toString(36).substring(2, 11) + '@gmail.com'
        var invoice = {
            id: Math.random().toString(16).slice(2),
            cash: Math.floor((Math.random() * 999999)) + " " + currency[Math.floor((Math.random() * currency.length))],
            currency: getRandom(currency)
        }

        db.customers.insert({
            FName: getRandom(fnames),
            SName: getRandom(snames),
            LName: getRandom(lnames),
            adress: getRandom(adresses),
            phoneNumber: phoneNumber,
            email: email,
            invoice: invoice
        })
    }
}

function getRandom(input) {
    return input[Math.floor((Math.random() * input.length))];
}

// 1.1
db.employees.distinct("department")

// 1.2
var result = []
db.employees.find().forEach(function (w) {
    result.push({
        FName: w.FName,
        SName: w.SName,
        salary: w.salary
    })
})
result;

//1.3
let result = [];
db.employees.find().forEach(w => {
    result.push({
        FName: w.FName,
        SName: w.SName,
        email: w.FName.toLowerCase() + "." + w.SName.toLowerCase() + "@bankoftomarow.bg"
    });
});
result;

//1.4
db.employees.find({
    workExperience: {
        $gt: 4
    }
})

//1.5
db.employees.find({
    FName: /^S/
});

//1.6
db.employees.find({
    country: {
        $not: /^Bulgaria.*/
    }
})

//1.7
db.employees.find({
    $or: [{
            FName: {
                $regex: /l/i
            }
        },
        {
            SName: {
                $regex: /l/i
            }
        },
        {
            LName: {
                $regex: /l/i
            }
        }
    ]
})

//3.1
db.employees.find({
    fired: true
})

//3.2
db.employees.find({
    motherhood: true
})

//3.3
db.employees.find({
    leave: true
})

//3.4
db.employees.find({
    $and: [{
        salary: {
            $gte: 2000
        }
    }, {
        salary: {
            $lte: 3000
        }
    }]
});

//3.5
db.employees.find({
    salary: 2500
})
db.employees.find({
    salary: 3000
})
db.employees.find({
    salary: 3500
})
db.employees.find({
    salary: 4000
})
db.employees.find({
    salary: 4500
})
db.employees.find({
    salary: 5000
})


//3.6
db.employees.find({
    boss: ""
})

//3.7
db.employees.find({
    salary: {
        $gt: 5000
    }
}).sort({
    FName: 1
})

//3.8
var result = [];
var departments = ["operations", "crediten analysis"];
departments.forEach(function (department) {
    result.push({
        department: db.employees.find({
            department: department
        }).sort({
            salary: -1
        }).limit(5)
    })
})

//3.9
var result = [];
var departments = ["operations", "crediten analysis"];
departments.forEach(function (department) {
    result.push({
        department: db.employees.aggregate([{
            $group: {
                total: {
                    $sum: "$salary"
                }
            }
        }])
    })
})

//3.10
var result = [];
var departments = ["operations", "crediten analysis"];
departments.forEach(function (department) {
    result.push({
        department: db.employees.aggregate([{
            "$group": {
                "avg_salary": {
                    "$avg": "$salary"
                },
            }
        }])
    })
})

//4.1
db.customers.find({
    invoice: {
        currency: {
            $ne: "BGN"
        }
    }
})

//4.2
db.customers.find({
    invoice: {
        cash: {
            $eq: 0
        }
    }
});

//4.3
db.customers.find().forEach(function (document) {
    db.customers.update({}, {
        $set: {
            invoice: {
                name: document.FName + document.invoice.currency
            }

        }
    }, {
        multi: true
    })
})