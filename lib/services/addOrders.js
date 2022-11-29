async function addOrders (obj, id, connectionId) {
    for (let i = 0; i < obj["orderList"].length; i++) {
        await connectionId.execute("INSERT into orders (specified_date, id_catalog, price, amount, id_user) values (?, ?, ?, ?, ?)",
            [obj["date"], (Number(obj["orderList"][i][0])), Number(obj["orderList"][i][1]), Number(obj["orderList"][i][2]), id]);
    }
}

module.exports = addOrders;
