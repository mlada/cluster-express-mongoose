const mongoose = require("mongoose");
const message = require("./helpers/validation-messages");
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoIndex: true,
    unique: true
  },
  name: {
    type: String,
    required: [false],
    maxlength: [32, message.tooLong],
    minlength: [6, message.tooShort]
  },
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
const User = mongoose.model("User", userSchema);
module.exports = User;
