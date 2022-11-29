
function setKey(key, i, connectionId) {
    let promise = new Promise((resolve) => {
        connectionId.execute("UPDATE users set `key` = ? where id_users = ?", [key, i], (err, res, fields) => {
            if (err) throw err;
            resolve();
        });
    })
    return promise;
}

module.exports = setKey;
