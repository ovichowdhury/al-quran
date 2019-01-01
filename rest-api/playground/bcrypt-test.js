var bcrypt = require('bcrypt');


async function run() {
    try{
        let salt = await bcrypt.genSalt(10);
        console.log("Salt : ", salt);
        let hash = await bcrypt.hash('password', salt);
        console.log("Password hash : ", hash);
    }
    catch(ex){
        console.log("Error");
    }
}

run();