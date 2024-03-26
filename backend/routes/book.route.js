const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const imageUpload = require("../middlewares/imageSet");
const imageFormat = require("../middlewares/imageSet");
const imageDelete = require("../middlewares/imageSet");
const bookCtrl = require("../controllers/book.controller");

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);
router.get('/bestrating', bookCtrl.getBestRatedBook);
router.post('/:id/rating', auth, bookCtrl.getAverageRating)
router.post('/', auth, imageUpload, imageFormat, bookCtrl.createBook);
router.put('/:id', auth, imageUpload, imageFormat, bookCtrl.modifyBook);
router.delete('/:id', auth, imageDelete, bookCtrl.deleteBook);

module.exports = router;