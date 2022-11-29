const setKey = require('./../services/setKey');

async function disconnect(cookie, connectionId) {
    if (cookie != undefined) {
        await setKey(null, cookie, connectionId);
    }
}

module.exports = disconnect;
