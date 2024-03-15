const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  auteur: { type: String, required: true },
  year: { type: String, required: true },
  gender: { type: String, required: true },
  rate: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);

