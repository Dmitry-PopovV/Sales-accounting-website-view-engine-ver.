const getKeyAndLogin = require('./getKeyAndLogin');

async function checkCookieAndGetLogin(cookie, connectionId) {
    if (cookie != undefined) {
        let {key, login} = await getKeyAndLogin(Number(cookie.split("<&>")[1]), connectionId);
        return {bool: cookie === key, login};
    }
    else
        return false;
}

module.exports = checkCookieAndGetLogin;
