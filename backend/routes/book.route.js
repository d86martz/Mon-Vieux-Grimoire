const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const bookCtrl = require("../controllers/book.controller");
const imageUpload = require("../middlewares/imageSet");

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.get("/bestrating", bookCtrl.getBestRatedBook);
router.post("/:id/rating", auth, bookCtrl.getAverageRating);
router.post("/", auth, imageUpload, bookCtrl.createBook);
router.put("/:id", auth, imageUpload, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
