const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
     name: String,
     author: String,
     tags: [String],
     price: String
});

const Book = mongoose.model('Book', bookSchema);

function validateBook(books) {
     const schema = {
          name: Joi.string().max(50).required(),
          author: Joi.string().min(3).max(50).required(),
          tags: Joi.string().required(),
          price: Joi.string().required()
     };

     return Joi.validate(books, schema)
};

exports.Book = Book;
exports.validate = validateBook;
