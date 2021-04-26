const express = require('express');
const validationArticle = require('../middlewares/validationArticle');
const uploadImage = require('../middlewares/uploadImage');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getOneArticle);
router.post(
  '/create',
  [
    validationArticle.validateArticleParams,
    validationArticle.validationArticle,
  ],
  articleController.createOneArticle
);
router.put(
  '/upload/:id',
  uploadImage.single('articleImage'),
  articleController.uploadImageArticle
);

module.exports = router;
