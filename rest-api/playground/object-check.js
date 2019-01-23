let obj = {
    name : "nahid",
    hash : "00000000",
    id : 1234
};


let hash = obj.hash;

obj.hash = "";

console.log(hash);

console.log(obj.hash);