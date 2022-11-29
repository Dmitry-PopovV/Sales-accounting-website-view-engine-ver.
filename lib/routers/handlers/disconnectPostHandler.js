const disconnect = require('../../services/disconnect');

function disconnectPostHandler() {
    return (req, res) => {
        disconnect(req.myIdVal, req.dbConnection);
                res.clearCookie("key");
                res.sendStatus(200);
    }
}

module.exports = disconnectPostHandler;