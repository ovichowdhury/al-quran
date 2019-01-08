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

module.exports = {
    createBook : createBook,
    removeBook : removeBook,
    updateBook : updateBook
}