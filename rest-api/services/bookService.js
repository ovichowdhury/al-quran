const bookModel = require('../models/book');
const genesis = require('../config/genesis');
const mongoose = require('mongoose');

function createBook(title, type, author){
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
    return bookModel.findOneAndDelete({title : title});
}


function updateBook(id, key, value) {
    return bookModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {[key]: value});
}

 function getAllBook(){
    return  bookModel.aggregate([
        {
            $match : {}
        },
        {
            $project : {
                contents : 0
            }
        }
    ]);

}

function searchByTitle(title){
    return bookModel.findOne({title:title});
//     return  bookModel.aggregate([
    
//     {
//         $match : {title:title}
//     },
//     {
//         $project : {
//             type:0,
//             author:0,
//             contents : 0
//         }
//     }
// ]);
    
}

module.exports = {
    createBook : createBook,
    removeBook : removeBook,
    updateBook : updateBook,
    getAllBook : getAllBook,
    searchByTitle: searchByTitle
}