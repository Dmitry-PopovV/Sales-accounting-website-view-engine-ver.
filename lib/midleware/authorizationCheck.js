const checkCookieAndGetLogin = require('../services/checkCookieAndGetLogin');

function authorizationCheck() {
    return (req, res, next) => {
        const cookie = (req.cookies['key']);
        if (cookie != undefined)
            req.myIdVal = Number(cookie.split("<&>")[1]);
        checkCookieAndGetLogin(cookie, req.dbConnection).then(val => {
            if (val.bool) {
                req.myLogin = val.login;
                next();
            } else {
                res.redirect("/login");
            }
        });
    }
}

module.exports = authorizationCheck;
