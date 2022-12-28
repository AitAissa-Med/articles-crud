const express = require('express');
const articleController = require('../controllers/articleController');
const router = express.Router();

router.get('/update/:articleID', articleController.show1);
router.get('/store', (req, res) => {
    res.render('add');
});

module.exports = router;