const book = require("../models/book.model")

exports.getAllBook = (req, res, next) => {
    book.find()
      .then(book => res.status(200).json(book))
      .catch(error => res.status(400).json({ error }));
  };
  
  exports.createBook = (req, res, next) => {
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  exports.getOneBook = (req, res, next) => {
    book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  };
  
  exports.modifyBook = (req, res, next) => {
    book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  exports.deleteBook = (req, res, next) => {
    book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };