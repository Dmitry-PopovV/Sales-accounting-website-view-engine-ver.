const DbConnection = require('../services/dbConnection');

const dbConnection = new DbConnection();

function addDbConnectionToReq() {
    return (req, res, next) => {
        req.dbConnection = dbConnection.id;
        next();
    }
}

module.exports = addDbConnectionToReq;
