const bookModel = require('../models/book');
const genesis = require('../config/genesis');
const mongoose = require('mongoose');
const childProcess = require('child_process');
const ethService = require('./ethService');

/**
 * utility functions
 */

function getUnixTime() {
    return Math.round(new Date().getTime() / 1000);
}

/*
    Generic service methods 
*/

function createBook(title, type, author) {
    let genesisBlock = genesis.genesisBlock;
    let newBook = new bookModel({
        title: title,
        type: type,
        author: author,
        contents: [genesisBlock]
    });
    return newBook.save();
}

function removeBook(title) {
    return bookModel.findOneAndDelete({ title: title });
}


function updateBook(id, key, value) {
    return bookModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { [key]: value }).select('_id title type author');
}

function getAllBook() {
    return bookModel.aggregate([
        {
            $match: {}
        },
        {
            $project: {
                contents: 0
            }
        }
    ]);

}

function searchByTitle(title) {
    return bookModel.aggregate([
         {
           $match: {title: title}
         },

         {
             $project: {
                 contents : 0
             }
         }
    ]);
}

async function getLastSubDoc(bookTitle) {
    let result = await bookModel.aggregate([
        {
            $match : {title: bookTitle}
        },
        {
            $project : {
                _id: 0,
                last : {$arrayElemAt: ["$contents", -1]}
            }
        }
    ]);

    return result[0].last;
}

// for removing last block from content array
function removeLastBlock(title) {
    return bookModel.updateOne({title: title}, {$pop : {contents: 1}});
}


/**
 * Quran specific services
 */



async function mineQuranBlock(title, ayatInfo, response) {
    console.log("In sevice");
    let lastBlock = await getLastSubDoc(title);
    console.log(lastBlock);
    let quranBlock = {
        index : lastBlock.index + 1,
        nonce : 0,
        timestamp : getUnixTime(),
        previousHash : lastBlock.hash,
        hash : "",
        surahName : ayatInfo.surahName,
        ayatNum : ayatInfo.ayatNum,
        paraNum : ayatInfo.paraNum,
        rukuNum : ayatInfo.rukuNum,
        arabic : ayatInfo.arabic,
        english : ayatInfo.english,
        bangla : ayatInfo.bangla,
        otherInfo : ayatInfo.otherInfo
    }
    console.log(JSON.stringify(quranBlock));
    const child = childProcess.fork(__dirname + '/miner.js', [JSON.stringify(quranBlock)]);

    child.on('message', async (block) => {
        console.log("Got the block from miner");
        console.log(block);
        let query = {title: title};
        let cond = {
            $push : {
                contents : block
            }
        }
        let ethTx = await ethService.addAyatHash(block.index, block.hash);
        if(ethTx.transactionHash){
            await bookModel.updateOne(query, cond)
            response.status(200).json({block: block, ethTx: ethTx});
        }
        else{
            response.status(500).json({message : "Ethereum transaction error. block can not be added"});
        }
        
    });
}

async function quranValidityCheck(response, title) {
    console.log("In quran validity check service");
    childProcess.execFile('node', [`${__dirname}/quranValChecker.js`, title], (err, stdout, stderr) => {
        if(err) throw err;
        response.status(200).json(JSON.parse(stdout));
    });
}

module.exports = {
    createBook: createBook,
    removeBook: removeBook,
    updateBook: updateBook,
    getAllBook: getAllBook,
    searchByTitle: searchByTitle,
    getLastSubDoc: getLastSubDoc,
    mineQuranBlock: mineQuranBlock,
    removeLastBlock: removeLastBlock,
    quranValidityCheck: quranValidityCheck
}