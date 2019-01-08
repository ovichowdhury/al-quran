const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const bookService = require('../services/bookService');


// for adding a new book
router.post('/create',[auth.authenticate], async function(req, res, next){
    try{
        let result = await bookService.createBook(req.body.title, req.body.type, req.body.author);
        res.status(200).json(result);
    }
    catch(ex){
        res.status(500).json({message : "Internal Server Error"});
    }

});

// for removing a book
router.delete('/delete/:title', [auth.authenticate], async function(req, res, next) {
    try {
        let result = await bookService.removeBook(req.params.title);
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({message : "Internal Server Error"});
    }
});

// for updating book information
router.put('/update/:id', [auth.authenticate], async function(req, res, next) {
    try {
        let result = await bookService.updateBook(req.params.id, req.body.key, req.body.value);
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({message : "Internal Server Error"});
    }
});


module.exports = router;
