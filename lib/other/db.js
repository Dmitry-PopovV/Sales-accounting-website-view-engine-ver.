const mysql = require('mysql2');

class db {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "full_stack",
            password: "Qwerty12345",
            database: "full_stack_db"
        });

        //this.connection.connect();
    }

    getCatalog() {
        let arr = [];
        let promise = new Promise((resolve) => {
            this.connection.execute("SELECT * from catalog", (err, res, fields) => {
                if (err) throw err;
                res.forEach((el, i) => {
                    arr[i] = [res[i].name, res[i].default_price];
                });
                resolve(arr);
            });
        })
        return promise;
    }

    getPass = async function (login) {
        let pass, I;
        let promise = new Promise((resolve) => {
            this.connection.execute("SELECT pass_hash, id_users from users where binary login = ?", [login], (err, res, fields) => {
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

    setKey = async function (key, i) {
        let promise = new Promise((resolve) => {
            this.connection.execute("UPDATE users set `key` = ? where id_users = ?", [key, i], (err, res, fields) => {
                if (err) throw err;
                resolve();
            });
        })
        return promise;
    }

    getKey = async function (i) {
        let key;
        let promise = new Promise((resolve) => {
            this.connection.execute("SELECT `key` from users where id_users = ?", [i], (err, res, fields) => {
                if (err) throw err;
                if (res[0] != undefined)
                    key = res[0].key;
                resolve(key);
            });
        })
        return promise;
    }

    addOrders = async function (obj, id) {
        for (let i = 0; i < obj["orderList"].length; i++) {
            await this.connection.execute("INSERT into orders (specified_date, id_catalog, price, amount, id_user) values (?, ?, ?, ?, ?)",
                [obj["date"], (Number(obj["orderList"][i][0]) + 1), Number(obj["orderList"][i][1]), Number(obj["orderList"][i][2]), id]);
        }
    }

    getOrdersAll = async function (list) {
        const param = list.join(', ');
        let promise = new Promise((resolve) => {
            let arr = [];
            this.connection.query("SELECT convert(specified_date, char) as specified_date, name, price, amount from orders left join catalog using(id_catalog) where id_catalog in(" + param + ")", (err, res, fields) => {
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

    getOrdersFrom = async function (list, date1) {
        const param = list.join(', ');
        let promise = new Promise((resolve) => {
            let arr = [];
            this.connection.query("SELECT convert(specified_date, char) as specified_date, name, price, amount from orders left join catalog using(id_catalog) where id_catalog in(" + param + ") and specified_date >= ?", [date1], (err, res, fields) => {
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

    getOrdersBefore = async function (list, date2) {
        const param = list.join(', ');
        let promise = new Promise((resolve) => {
            let arr = [];
            this.connection.query("SELECT convert(specified_date, char) as specified_date, name, price, amount from orders left join catalog using(id_catalog) where id_catalog in(" + param + ") and specified_date <= ?", [date2], (err, res, fields) => {
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

    getOrdersBetween = async function (list, date1, date2) {
        const param = list.join(', ');
        let promise = new Promise((resolve) => {
            let arr = [];
            this.connection.query("SELECT convert(specified_date, char) as specified_date, name, price, amount from orders left join catalog using(id_catalog) where id_catalog in(" + param + ") and specified_date >= ? and specified_date <= ?", [date1, date2], (err, res, fields) => {
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

}

module.exports = db;
