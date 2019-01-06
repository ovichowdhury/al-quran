const crypto = require('crypto');

var obj = {
    idNum: 1,
    ayatNo: 1,
    SurahName: 'fatiha',
    Para: 1,
    previousHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    arabic: 'ضثقغللاةنعغق',
    english: 'this is english',
    bangla: 'হেল্ল বর্ল্দ কেমন আস'
};

var str = obj.idNum.toString() + obj.ayatNo.toString() + obj.SurahName + obj.Para.toString() + obj.previousHash + obj.arabic + obj.english + obj.bangla;
console.log(str);
var hash = crypto.createHash('sha256').update(str).digest('hex');

console.log(hash);

console.log(typeof hash);