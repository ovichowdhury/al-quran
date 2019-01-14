const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const quranSearchService = require('../services/quranSearchService');


router.get('/by-surahname-and-ayatnum/:surahName/:ayatNum', [auth.authenticate], async function(req, res, next) {
    try {
        let result = await quranSearchService.bySurahNameAndAyatNum(req.params.surahName, req.params.ayatNum);
        res.status(200).json(result);
    }
    catch(ex) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});




module.exports = router;