const checkPass = require('../../services/checkPass');
const createCookie = require('../../services/createCookie');

function loginPostHandler() {
    return (req, res) => {
        const data = req.body;
        checkPass(data, req.dbConnection)
            .then(val => {
                if (val.answer) {
                    return createCookie(val.I, req.dbConnection).then((cookie) => {
                        res
                            .cookie("key", cookie, { httpOnly: true, secure: true, sameSite: true })
                            .redirect('../');
                    });
                } else {
                    res.cookie("wrong", "true", { maxAge: 6000 });
                    res.redirect("/login");
                }
            });
        }
}

module.exports = loginPostHandler;
