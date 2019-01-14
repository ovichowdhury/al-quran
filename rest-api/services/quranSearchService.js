const bookModel = require('../models/book');

const bookTitle = "quran"

async function bySurahNameAndAyatNum(surahName, ayatNum) {
    let query = [
        {
            $match : {title : bookTitle}
        },
        {
            $addFields : {
                "ayats" : {
                    $filter : {
                        input : "$contents",
                        as : "ayat",
                        cond : {$and : [
                            {$eq: ["$$ayat.surahName", {$toLower : surahName} ]},
                            {$eq: ["$$ayat.ayatNum", parseInt(ayatNum)]}
                        ]}
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
    //console.log(query[1].$addFields.ayats.$filter.cond.$and[1]);
    let result = await bookModel.aggregate(query);
    return result[0].ayats[0];
}


module.exports = {
    bySurahNameAndAyatNum: bySurahNameAndAyatNum
}