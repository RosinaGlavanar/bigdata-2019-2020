const fs = require('fs');
const userHlpr = require("./helper/user");
const cryptoHlpr = require("./helper/crypto")
var idUserLogged;

var loginInput = document.getElementById("loginInput");
var ulCrypto = document.getElementById("ulCrypto");
var cryptoList = document.getElementById("cryptoList");
var sendForm = document.getElementById("sendForm");

function signIn() {
    if (userHlpr.isExist(loginInput.value)) {
        idUserLogged = loginInput.value;
        document.getElementById("loginForm").style.visibility = 'hidden';
        createHTML();
    }
}

function createHTML() {
    ulCrypto.innerHTML = "";
    let cryptocurrenciesObj = fs.readFileSync("./criptoList.json");
    let cryptocurrenciesList = JSON.parse(cryptocurrenciesObj);
    cryptocurrenciesList.crypto.forEach(crypto => {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.innerHTML = crypto;
        li.appendChild(button);
        ulCrypto.appendChild(li);
        button.addEventListener("click", function () {
            document.getElementById("sendForm").innerHTML = "";
            cryptoList.innerHTML = "";

            let users = [];
            let userFolderList = fs.readdirSync("./storage/users");
            userFolderList.forEach(folder => {
                let file = "./storage/users/" + folder + "/info.json";
                let userInfoObj = fs.readFileSync(file);
                let userInfo = JSON.parse(userInfoObj);
                userInfo.forEach(obj => {
                    if (obj.crypto == crypto) {
                        users.push(folder);
                    }
                })
            })
            users.forEach(user => {
                let li = document.createElement("li");
                let button = document.createElement("button");
                button.setAttribute("type", "button");
                button.innerHTML = user;
                li.appendChild(button);
                cryptoList.appendChild(li);

                button.addEventListener("click", function () {
                    sendForm.innerHTML = "";

                    let inputElement = document.createElement("input");
                    inputElement.setAttribute("type", "numder");
                    inputElement.setAttribute("id", "amoutInput");
                    sendForm.appendChild(inputElement);

                    let buttonElement = document.createElement("button");
                    buttonElement.setAttribute("type", "text");
                    buttonElement.innerHTML = "Send";
                    sendForm.appendChild(buttonElement);

                    buttonElement.addEventListener("click", function () {
                        let amout = document.getElementById("amoutInput").value;
                        cryptoHlpr.sendMoney(idUserLogged, user, crypto, amout);
                    });
                });
            });
        });
    });
}