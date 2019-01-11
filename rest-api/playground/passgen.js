var bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);

console.log(salt);

let hash = bcrypt.hashSync("nahidchowdhury", salt);

console.log(hash);