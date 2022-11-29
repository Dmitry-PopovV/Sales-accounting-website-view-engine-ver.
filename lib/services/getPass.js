function getPass(login, connectionId) {
    let pass, I;
    let promise = new Promise((resolve) => {
        connectionId.execute("SELECT pass_hash, id_users from users where binary login = ?", [login], (err, res, fields) => {
            if (err) throw err;
            if (res[0] != undefined) {
                pass = res[0].pass_hash;
                I = res[0].id_users;
            }
            resolve({ pass, I });
        });
    })
    return promise;
}

module.exports = getPass;
