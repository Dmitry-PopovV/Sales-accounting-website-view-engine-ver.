const bcrypt = require('bcrypt');

const saltRounds = 10;

bcrypt.hash("qwerty", saltRounds).then(function (hash) {console.log(hash)});
