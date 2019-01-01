var fs = require('fs');

fs.readFile('./key.json', function(err, data) {
    let obj = JSON.parse(data);
    console.log(obj.jwtAuthKey);
});

