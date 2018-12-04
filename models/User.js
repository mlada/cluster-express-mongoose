const mongoose = require('mongoose');
const message = require('./helpers/validation-messages');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, message.required],
    maxlength: [32, message.tooLong],
    minlength: [6, message.tooShort]
  },
  password: {
    type: String,
    maxlength: [32, message.tooLong],
    minlength: [8, message.tooShort],
    match: [/^[A-Za-z0-9]+$/, message.incorrect],
    required: [true, message.required]
  }
});

// Компилируем модель
const User = mongoose.model('user', userSchema);

module.exports = User;
