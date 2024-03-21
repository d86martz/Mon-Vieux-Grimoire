const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const imageConfig = require("../middlewares/image-config");
const bookCtrl = require("../controllers/book.controller");

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);
// router.get('/bestrating', bookCtrl.bestratingBook)
router.post('/', auth, imageConfig, bookCtrl.createBook)
// router.post('/:id/rating', auth, bookCtrl.averageRating)
router.put('/:id', auth, imageConfig, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;