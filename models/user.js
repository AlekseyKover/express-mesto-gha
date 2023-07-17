const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    default: 'Жак-Ив Кусто',
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    default: 'Исследователь',
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле email должо быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должо быть заполнено'],
    selecet: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function password() {
  const user = this.toObject();
  delete user.password;
  return user;
};
module.exports = mongoose.model('user', userSchema);
