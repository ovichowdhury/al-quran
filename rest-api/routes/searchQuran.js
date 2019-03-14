const express = require('express');
const router = express.Router();
//const auth = require('../middlewares/auth');
const quranSearchService = require('../services/quranSearchService');


router.get('/by-surahname-and-ayatnum/:title/:surahName/:ayatNum', async function(req, res, next) {
    try {
        let result = await quranSearchService.bySurahNameAndAyatNum(
            req.params.surahName, 
            req.params.ayatNum, 
            req.params.title
        );
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get('/by-surahname/:title/:surahName', async function(req, res, next) {
    try {
        let result = await quranSearchService.bySurahName(req.params.surahName, req.params.title);
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.get('/by-ayathash/:title/:hash', async function(req, res, next){
    try{
        let result = await quranSearchService.byAyatHash(req.params.hash, req.params.title);
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get('/by-ayatindex/:title/:index', async function(req, res, next){
    try{
        let result = await quranSearchService.byAyatIndex(req.params.index, req.params.title);
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;