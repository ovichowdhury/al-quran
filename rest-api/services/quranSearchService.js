const bookModel = require('../models/book');

//const bookTitle = "quran"

async function bySurahNameAndAyatNum(surahName, ayatNum, bookTitle) {
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


async function bySurahName(surahName, bookTitle) {
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
                        cond : {$eq: ["$$ayat.surahName", {$toLower : surahName} ]}
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

    let result = await bookModel.aggregate(query);
    return result[0];
}

async function byAyatHash(hash, bookTitle) {
    //console.log(hash, " : ", bookTitle);
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
                        cond : {$eq: ["$$ayat.hash", hash ]}
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
    //console.log(query[1].$addFields.ayats.$filter.cond.$eq);
    let result = await bookModel.aggregate(query);
    //console.log(result);
    return result[0].ayats[0];
}



async function byAyatIndex(index, bookTitle) {
    //console.log(hash, " : ", bookTitle);
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
                        cond : {$eq: ["$$ayat.index", parseInt(index) ]}
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
    //console.log(query[1].$addFields.ayats.$filter.cond.$eq);
    let result = await bookModel.aggregate(query);
    //console.log(result);
    return result[0].ayats[0];
}


module.exports = {
    bySurahNameAndAyatNum: bySurahNameAndAyatNum,
    bySurahName: bySurahName,
    byAyatHash: byAyatHash,
    byAyatIndex: byAyatIndex
}