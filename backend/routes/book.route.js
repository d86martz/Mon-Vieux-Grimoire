const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
// const multer = require("../middlewares/multer-config");
const bookCtrl = require("../controllers/book.controller");

router.get('/', auth, bookCtrl.getAllBook);
router.post('/', auth, bookCtrl.createBook);
router.get('/:id', auth, bookCtrl.getOneBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;