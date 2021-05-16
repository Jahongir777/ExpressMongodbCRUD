const express = require('express');
const booksRoute = require('./routes/route');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/BookShop', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
     console.log('MongoDBga ulanish muvaffaqiyatli bajarildi...');
})
.catch((err) => {
     console.error('MongoDBga ulanishda xatolik ro\'y berdi...', err);
});

mongoose.set('useFindAndModify', false);
app.use(express.json());
app.use('/api/shopping', booksRoute);

const port = process.env.PORT || 5000

app.listen(port, () => {
     console.log(`${port}chi portni eshitishni boshladim...`);
});