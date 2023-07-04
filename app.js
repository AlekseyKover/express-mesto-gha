const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const NOT_FOUND = 404;
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '64495405223aeb3e62e62c5a',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/card'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Нет такого роута' });
});

app.listen(PORT);
