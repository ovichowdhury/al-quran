var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/TestDB', { useNewUrlParser: true })
.then(async function() {
    const childSchema = mongoose.Schema({
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
    mongoose.connection.close();
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

