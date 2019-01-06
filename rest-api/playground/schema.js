var mongoose = require('mongoose');


var arr = [];
for(let i=0; i<1000000; i++){
    arr.push(i);
}

mongoose.connect('mongodb://localhost/TestDB', { useNewUrlParser: true })
.then(async function() {
   /* const childSchema = mongoose.Schema({
        name : String,
        age : Number
    });
    
    const parentSchema = mongoose.Schema({
        name : String,
        child : [childSchema]
    });
    
    var Parent = mongoose.model('Parent', parentSchema);

    let result = await Parent.aggregate([
        {
            $match : {'name' : 'Quran'}
        },
        {
            $addFields : {
                "ayats" : {
                    $filter : {
                        input : "$child",
                        as : "ayat",
                        cond : {$eq: ["$$ayat.age", 1500]}
                    }
                }
            }
        },
        {
            $project : {
                _id : 0,
                ayats : 1
            }
        }
    ]);

    console.log(result[0].ayats[0]);
    mongoose.connection.close();*/


    const dummySchema = mongoose.Schema({}, {strict : false});

    const dummyModel = mongoose.model('dummy', dummySchema);

    var nDummy = new dummyModel({
        idNum: 3,
        ayatNo: 1,
        SurahName: 'fatiha',
        Para: 1,
        previousHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
        arabic: 'ضثقغللاةنعغق',
        english: 'this is english',
        bangla: 'হেল্ল বর্ল্দ কেমন আস',
        myarr : arr
    });

    await nDummy.save()


    let result = await dummyModel.aggregate([
        {
            $match : {idNum : 3}
        },
        {
            $addFields : {
                "size" : {
                    $size : "$myarr"
                }
            }
        }
    ]);

    console.log(result[0].size);

    




});

/*
db.getCollection('posts').aggregate(
    {$match: {"author.id": authorId}},
	{$addFields : {"comments":{$filter:{ // We override the existing field!
		input: "$comments",
		as: "comment",
		cond: {$eq: ["$$comment.state.deleted", false]}
	}}}}
);
 */

