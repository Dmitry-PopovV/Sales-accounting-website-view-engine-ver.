const mysql = require('mysql2');

class DbConnection {
    constructor() {
        this.id = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "full_stack",
            password: "Qwerty12345",
            database: "full_stack_db"
        });

        //this.id.connect();
    }


}

module.exports = DbConnection;
