const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const auth = require('./middlwares/auth');
const { createUser, login } = require('./controllers/users');
const error = require('./middlwares/error');

const NOT_FOUND = 404;
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.post('/signup', createUser);
app.post('/signin', login);

/*
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
}); */
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/card'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Нет такого роута' });
});
app.use(error);
app.listen(PORT);
