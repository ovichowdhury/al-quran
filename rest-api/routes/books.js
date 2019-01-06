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


module.exports = router;
