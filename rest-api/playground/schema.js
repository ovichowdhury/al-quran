var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/TestDB', { useNewUrlParser: true })
.then(
() => {

const childSchema = mongoose.Schema({
    name : String,
    age : Number
});

const parentSchema = mongoose.Schema({
    name : String,
    child : [childSchema]
});

var Parent = mongoose.model('Parent', parentSchema);

/*var newParent = new Parent({
    name: "Hadith",
    child: [{
        name: "Verse",
        age : 1400
    }]
});

newParent.save((err, res) => {
    if(err) console.log(err);
    else console.log(res);
})*/

/*async function run(){
    var quran = await Parent.findOne({'name' : 'Quran'});
    console.log(quran.child);
    
    console.log("End............", d);
}


run();*/



/*Parent.findOne({'name' : 'Quran'}, (err, quran) => {
    console.log(quran.child);
    mongoose.connection.close();
});*/

async function run(){
    Parent.findOne({'name' : 'Quran'}).where('child.age').equals(1400).select('child').exec((err, res) => {
        console.log(res);
        mongoose.connection.close();
    });
    
}

run();

});