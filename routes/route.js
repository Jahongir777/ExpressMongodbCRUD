const express = require('express');
const router = express.Router();
const { Book, validate } = require('../models/model');

router.get('/', async (req, res) => {
     const books = await Book.find().sort('name');
     res.send(books);
});

router.post('/', async (req, res) => {
     const { error } = validate(req.body);

     if (error)
          return res.status(404).send(error.details[0].message);

     let book = new Book({
          name: req.body.name,
          author: req.body.author,
          tags: req.body.tags,
          price: req.body.price
     });

     book = await book.save();
     res.status(201).send(book);
});

router.get('/:id', async (req, res) => {
     const book = await Book.findById(req.params.id);

     if (!book)
          return res.status(404).send('Bunday IDga teng bo\'lgan kitob topilmadi');
     res.send(book);
});

router.put('/:id', async (req, res) => {
     const { error } = validate(req.body);

     if (error)
          return res.status(404).send(error.details[0].message);

     let book = await Book.findByIdAndUpdate(req.params.id, { name: req.body.name, author: req.body.author, price: req.body.price, tags: req.body.tags}, { new: true });

     if (!book)
          return res.status(404).send('Bunday IDga teng bo\'lgan kitob topilmadi');

     res.send(book);
});

router.delete('/:id', async (req, res) => {
     const book = await Book.findByIdAndRemove(req.params.id);
     if (!book)
          return res.status(404).send('Bunday IDga teng bo\'lgan kitob toplimadi');

     res.send(book);
});

module.exports = router;