//console.log(process.argv);
var number = parseInt(process.argv[2]);
//console.log("Number  : ", number);

for(let i=0; i<1000000000; i++){
    number++;
}

let block = {
    name : "dummy block",
    number : number,
    time : Date.now()
}
//console.log("Child : ", number);
process.send(block);

