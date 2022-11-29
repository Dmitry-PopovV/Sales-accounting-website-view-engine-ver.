const exp = require('express');
const { urlencoded } = require('body-parser');
const loginPostHandler = require('./handlers/loginPostHandler');

const publicRouter = exp.Router();
const loginRouter = exp.Router();


publicRouter
    .use("/", exp.static("./static/public"))
    .use("/login", loginRouter);

loginRouter
    .get('/', (req, res) => {
        res.render("login");
    })
    .use(urlencoded({ extended: true }))
    .post('/', loginPostHandler());

module.exports = publicRouter;
