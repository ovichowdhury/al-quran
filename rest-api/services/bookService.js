const bookModel = require('../models/book');
const genesis = require('../config/genesis');

async function createBook(title, type, author){
    let genesisBlock = genesis.genesisBlock;
    let newBook = new bookModel({
        title: title,
        type: type,
        author: author,
        contents: [genesisBlock]
    });
    return newBook.save();
}


module.exports = {
    createBook : createBook
}