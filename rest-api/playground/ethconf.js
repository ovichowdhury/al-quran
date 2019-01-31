const fs = require('fs');
const path = require('path');

var ethPath = path.join(__dirname, '../', '/config/eth.json');

async function run() {
    fs.readFile(ethPath, (err, data) => {

        console.log(JSON.parse(data).defaultAccount);
    });

}

run()
