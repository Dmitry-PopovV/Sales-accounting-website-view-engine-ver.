const exp = require('express');
const { urlencoded } = require('body-parser');
const loginPostHandler = require('./handlers/loginPostHandler');

const publicRouter = exp.Router();
const loginRouter = exp.Router();


publicRouter
    .use("/login", loginRouter)
    .use("/", exp.static("./././static/public"));

loginRouter
    .use(urlencoded({ extended: true }))
    .post('/', loginPostHandler());

module.exports = publicRouter;
