const https = require('https');
const exp = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const publicRouter = require('./lib/routers/publicRouter');
const privateRouter = require('./lib/routers/privateRouter');
const addDbConnectionToReq = require('./lib/midleware/addDbConnectionToReq');
const authorizationCheck = require('./lib/midleware/authorizationCheck');

const app = exp();
const redir = exp();


redir.get('*', (req, res) => {
    res.redirect('https://192.168.1.12:3001');
});


app
    .set('view engine', 'ejs')
    .use(addDbConnectionToReq())
    .use("/", publicRouter)
    .use(cookieParser())
    .use(authorizationCheck())
    .use("/", privateRouter);


const options = {
    pfx: fs.readFileSync('cert/cert.pfx'),
    passphrase: 'pass'
};

https
    .createServer(options, app)
    .listen(3001);

redir.listen(3000);
