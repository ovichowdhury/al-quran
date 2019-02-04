const childProcess = require('child_process');

childProcess.execFile('node', [`${__dirname}/passgen.js`], (err, stdout, stderr) => {
    if(err) throw err;
    console.log("In func");
    console.log(stdout);
});