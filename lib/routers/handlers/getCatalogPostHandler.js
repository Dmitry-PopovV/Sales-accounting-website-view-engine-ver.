const getCatalog = require('../../services/getCatalog');

function getCatalogPostHandler() {
    return (req, res) => {
        getCatalog(req.dbConnection)
                    .then((arr) => {
                        res.json(arr);
                    });
    }
}

module.exports = getCatalogPostHandler;
