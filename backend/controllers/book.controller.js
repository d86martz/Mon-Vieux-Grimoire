const fs = require("fs");
const Book = require("../models/book.model");
const imageSet = require("../middlewares/imageSet");

exports.getAllBooks = (req, res) => {
  Book.find()
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.createBook = (req, res) => {
  const bookData = JSON.parse(req.body.book);
  const book = new Book({
    ...bookData,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyBook = (req, res) => {
  Book.findOne({ _id: req.params.id }).then((book) => {
    if (book.userId != req.auth.userId) {
      res.status(401).json({ message: "Utilisateur non autorisé" });
    } else {
      if (req.file) {
        imageSet.delete(book.imageUrl);
      }
      const bookData = req.file
        ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      Book.updateOne({ _id: req.params.id }, { ...bookData })
        .then(() => res.status(200).json({ message: "Livre modifié !" }))
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id }).then((book) => {
    if (book.userId != req.auth.userId) {
      res.status(401).json({ message: "Utilisateur non autorisé" });
    } else {
      imageSet.delete(book.imageUrl);
      Book.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "Livre supprimé !" });
        })
        .catch((error) => res.status(401).json({ error }));
    }
  });
};

exports.getBestRatedBook = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAverageRating = (req, res) => {
  Book.findOne({ _id: req.params.id }).then((book) => {
    book.ratings.push({ userId: req.auth.userId, grade: req.body.rating });
    book.averageRating =
      book.ratings.reduce((acc, rating) => acc + rating.grade, 0) /
      book.ratings.length;
    book
      .save()
      .then((book) => res.status(201).json(book))
      .catch((error) => res.status(400).json({ error }));
  });
};
