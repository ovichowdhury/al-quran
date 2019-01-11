const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const bookService = require('../services/bookService');

// list of all books
router.get('/getall', [auth.authenticate], async function (req, res, next) {
    try {
        let result = await bookService.getAllBook();
        res.status(200).json(result);
    }
    catch (ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }

});

 // find one book
 router.get('/searchbook/:title', [auth.authenticate], async function(req,res,next){
    try{
        let result = await bookService.searchByTitle(req.params.title);
        res.status(200).json(result);  
    } 
    catch(ex){
        res.status(500).json({message:'Internal Server Error'});
    }
 });

// for adding a new book
router.post('/create', [auth.authenticate], async function (req, res, next) {
    try {
        let result = await bookService.createBook(req.body.title, req.body.type, req.body.author);
        res.status(200).json(result);
    }
    catch (ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }

});

// for removing a book
router.delete('/delete/:title', [auth.authenticate], async function (req, res, next) {
    try {
        let result = await bookService.removeBook(req.params.title);
        res.status(200).json(result);
    }
    catch (ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// for updating book information
router.put('/update/:id', [auth.authenticate], async function (req, res, next) {
    try {
        let result = await bookService.updateBook(req.params.id, req.body.key, req.body.value);
        res.status(200).json(result);
    }
    catch (ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * Quran specific routes
 */

 // mining a block for quran
 router.put('/mineblock-quran/:title', [auth.authenticate], async function(req, res, next) {
    try {
        let result = await bookService.mineQuranBlock(req.params.title, {
            surahName: req.body.surahName,
            ayatNum: req.body.ayatNum,
            paraNum: req.body.paraNum,
            rukuNum: req.body.rukuNum,
            arabic: req.body.arabic,
            english: req.body.english,
            bangla: req.body.bangla,
            otherInfo: req.body.otherInfo
        });
        console.log("in mine handler");
        console.log(result);
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({ message: ex });
    }
 });


module.exports = router;
