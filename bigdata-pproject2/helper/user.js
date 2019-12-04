const fs = require("fs");

const isExist = function (idUser) {
    let userList = fs.readdirSync("./storage/users");
    return userList.includes(idUser);
};

module.exports = {
    isExist
};