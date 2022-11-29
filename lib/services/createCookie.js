const bcrypt = require('bcrypt');
const setKey = require('./../services/setKey');

const saltRounds = 10;

async function createCookie(i, connectionId) {
    let cookie = await bcrypt.hash("potato" + Date.now(), saltRounds);
    cookie += "<&>" + i;
    setKey(cookie, i, connectionId);
    return cookie;
}

module.exports = createCookie;
