const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/TestDB', { useNewUrlParser: true }).then(async function () {
    const contentSchema = mongoose.Schema({}, { 'strict': false });

    const bookSchema = mongoose.Schema({
        title: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            minlength: 3
        },
        type: {
            type: String,
            trim: true,
            lowercase: true
        },
        author: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            minlength: 3
        },
        contents: [contentSchema]

    });

    const bookModel = mongoose.model('books', bookSchema);


    let res = await bookModel.aggregate([
        {
            $match : {}
        },
        {
            $project : {
                contents : 0
            }
        }
    ]);


    console.log(res);

});