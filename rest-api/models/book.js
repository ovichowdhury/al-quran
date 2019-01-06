const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({}, {'strict' : false});

const bookSchema = mongoose.Schema({
    title : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        minlength : 3
    },
    type : {
        type : String,
        trim : true,
        lowercase : true
    },
    author : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minlength : 3
    },
    contents : [contentSchema]

});

const bookModel = mongoose.model('books', bookSchema);

module.exports = bookModel;