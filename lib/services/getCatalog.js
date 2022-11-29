function getCatalog(connectionId) {
    let arr = [];
    let promise = new Promise((resolve) => {
        connectionId.execute("SELECT * from catalog", (err, res, fields) => {
            if (err) throw err;
            res.forEach((el, i) => {
                arr[i] = [res[i].name, res[i].default_price];
            });
            resolve(arr);
        });
    })
    return promise;
}

module.exports = getCatalog;
