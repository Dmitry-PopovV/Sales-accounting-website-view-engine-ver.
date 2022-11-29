const bcrypt = require('bcrypt');
const getPass = require('./../services/getPass');

async function checkPass(data, connectionId) {
    let res = false;

    let obj = await getPass(data.login, connectionId);
    if (obj.pass != undefined)
        res = await bcrypt.compare(data.pass, obj.pass); 

    return { answer: res, I: obj.I };
}

module.exports = checkPass;
