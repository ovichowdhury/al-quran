const childProcess = require('child_process');

const child = childProcess.fork('child.js', [10]);

child.on('message', (msg) => {
    console.log("From child process : ", msg);
});

child.on('exit', (code) => {
    console.log("Exit from child : ", code);
});

console.log("Waiting for mining");