const fs = require("fs");

const userPath = "./storage/users/";

function sendMoney(sender, recipient, crypto, amount) {
    let senderF = userPath + sender + "/info.json";
    let sender = fs.readFileSync(senderF);
    let senderParse = JSON.parse(sender);


    let recipientF = userPath + recipient + "/info.json";
    let recipient = fs.readFileSync(recipientF);
    let recipientParse = JSON.parse(recipient);

    for (let index = 0; index < senderParse.length; index++) {
        const obj = senderParse[index];
        if (crypto == obj.crypto) {
            if (obj.amount >= amount) {
                senderParse[index].amount = obj.amount - amount;
                console.log("sen", senderParse[index].amount);
                console.log(typeof (obj.amoun), typeof (amount));
                fs.writeFileSync(senderF, JSON.stringify(senderParse));
                for (let index = 0; index < recipientParse.length; index++) {
                    const objR = recipientParse[index];
                    if (recipientParse[index].crypto == crypto) {
                        recipientParse[index].amount = objR.amount + amount;
                        console.log("reci", recipientParse[index].amount);

                        fs.writeFileSync(recipientF, JSON.stringify(recipientParse));
                    }
                }
                alert("Money is send");
            } else {
                alert("Not enough money");
            }
        }
    }
}

module.exports = {
    sendMoney
};