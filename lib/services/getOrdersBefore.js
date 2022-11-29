async function getOrdersBefore (list, date2, connectionId) {
    const param = list.join(', ');
    let promise = new Promise((resolve) => {
        let arr = [];
        connectionId.query("SELECT convert(specified_date, char) as specified_date, name, price, amount from orders left join catalog using(id_catalog) where id_catalog in(" + param + ") and specified_date <= ?", [date2], (err, res, fields) => {
                if (err) throw err;
                if (res[0] != undefined) {
                    res.forEach((el, i) => {
                        arr[i] = [];
                        for (let ii in el) {
                            arr[i].push(res[i][ii]);
                        }
                    });
                }
                resolve(arr);
            });
    })
    return promise;
}

module.exports = getOrdersBefore;
