async function getKeyAndLogin (i, connectionId) {
    let key, login;
    let promise = new Promise((resolve) => {
        connectionId.execute("SELECT `key`, login from users where id_users = ?", [i], (err, res, fields) => {
            if (err) throw err;
            if (res[0] != undefined) {
                key = res[0].key;
                login = res[0].login;
            }
            resolve({key, login});
        });
    })
    return promise;
}

module.exports = getKeyAndLogin;
