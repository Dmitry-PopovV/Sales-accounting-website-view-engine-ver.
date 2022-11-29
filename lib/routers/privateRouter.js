const exp = require('express');
const disconnectPostHandler = require('./handlers/disconnectPostHandler');
const getCatalogPostHandler = require('./handlers/getCatalogPostHandler');
const sellPostHandler = require('./handlers/sellPostHandler');
const getOrdersPostHandler = require('./handlers/getOrdersPostHandler');

const privateRouter = exp.Router();
const dbReqRouter = exp.Router();

privateRouter
    .get('/', (req, res) => {
        res.render("main", { login: req.myLogin });
    })
    .get('/list', (req, res) => {
        res.render("list", { login: req.myLogin });
    })
    .use("/db", dbReqRouter);

dbReqRouter
    .use(exp.json())
    .post('/getCatalog', getCatalogPostHandler())
    .post('/disconnect', disconnectPostHandler())
    .post('/sell', sellPostHandler())
    .post('/getOrders', getOrdersPostHandler());

module.exports = privateRouter;
