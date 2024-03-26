const fs = require('fs')

const Book = require("../models/book.model")

exports.getAllBooks = (req, res) => {
    Book.find()
      .then(book => res.status(200).json(book))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

exports.createBook = (req, res) => {
  const bookData = JSON.parse(req.body.book)
  delete bookData._id
  delete bookData._userId
  const book = new Book({
    ...bookData,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`
  });
  book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
    .catch(error => res.status(500).json({ error }));
};
  
exports.modifyBook = (req, res) => {
  const book = Book.findOne({ _id: req.params.id })
  const bookData = req.file
  ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`
    }
  : { ...req.body };
  if (req.file) {
  }
  Book.updateOne({ _id: req.params.id }, { ...bookData })
    .then(() => res.status(200).json({ message: 'Livre modifié !'}))
    .catch(error => res.status(500).json({ error }));
}

exports.deleteBook = (req, res) => {
  const book = Book.findOne({ _id: req.params.id })
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
    .catch(error => res.status(500).json({ error }));
}

exports.getAverageRating = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
  .then((book) => {
    return book.save()
      .then((book) => res.status(201).json(book))
      .catch(error => res.status(400).json({ error }));
  });
};

exports.getBestRatedBook = (req, res) => { 
  Book.find()
    .sort({averageRating: -1})
    .limit(3)
    .then((books => res.status(200).json(books)))
    .catch(error => res.status(500).json({ error }));
}