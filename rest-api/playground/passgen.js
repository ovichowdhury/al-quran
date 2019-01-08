var bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);

let hash = bcrypt.hashSync("mehedihasan", salt);

console.log(hash);