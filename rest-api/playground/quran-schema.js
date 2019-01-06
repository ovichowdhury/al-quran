var mongoose = require('mongoose');


var ayat = {
    idNum: 3,
    ayatNo: 3,
    SurahName: 'fatiha',
    Para: '1',
    hash: 'abcde',
    arabic: 'this is th ayat in fatiha',
    english: 'this is th ayat in fatiha',
    bangla: 'this is th ayat in fatiha'
};

mongoose.connect('mongodb://localhost/TestDB', { useNewUrlParser: true })
.then(async function() {
    const contentSchema = mongoose.Schema({}, {strict: false});
    
    const bookSchema = mongoose.Schema({
        name : String,
        type : String,
        contents : [contentSchema]
    });

    const Book = mongoose.model('Book', bookSchema);
    
    // inserting a Book

    async function insertBook() {
        var book = new Book({
            name : 'Hadith',
            type : 'Islamic',
            contents : [{verseNo: 1, arabic: 'this is arabic', english: 'this is eng', hash: 'abcd'}]
        });
        let result = await book.save();
        console.log(result);
    }

    // insert in sub array of object

    async function insertSubDoc() {
        let query = {'name' : 'Quran'};
        let cond = {
            $push : {
                contents : ayat
            }
        }

        let result = await Book.updateOne(query, cond)
        console.log(result);
    }

    // removing object from sub array

    async function removeSubdoc() {
        let query = {'name' : 'Quran'};
        let cond = { $pull : { contents : {_id : mongoose.Types.ObjectId("5c2d9713ce79142acca1d478")} } }

        let result = await Book.updateMany(query, cond);
        console.log(result);
    }

    // removing document from collection

    async function removeDoc() {
        let res = await Book.findOneAndDelete({'name' : 'Hadith'})
        console.log(res);
    }

    // 
    async function searchBySurahNameAndAyatNum() {
        let query = [
            {
                $match : {'name' : 'Quran'}
            },
            {
                $addFields : {
                    "ayats" : {
                        $filter : {
                            input : "$contents",
                            as : "ayat",
                            cond : {$and : [
                                {$eq: ["$$ayat.SurahName", {$toLower : 'FaTiha'} ]},
                                {$eq: ["$$ayat.ayatNo", 2]}
                            ]}
                            //cond : {$eq: ["$$ayat.idNum", 2]}
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
        ];

        let result = await Book.aggregate(query);
        console.log(result[0].ayats[0]);
    }

    await insertSubDoc();
    //await searchBySurahNameAndAyatNum();

    mongoose.connection.close();
});

