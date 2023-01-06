const express = require('express');
const ArticleController = require('../controllers/articleController');
const router = express.Router();

router.get('/', ArticleController.index);
router.get('/show/:articleID', ArticleController.show);
router.post('/update', ArticleController.update);
router.get('/remove/:articleID', ArticleController.remove);
router.post('/store', ArticleController.store);

module.exports = router;
