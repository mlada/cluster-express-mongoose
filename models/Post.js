const mongoose = require('mongoose');
const message = require('./helpers/validation-messages');
const URLSlugs = require('mongoose-url-slugs');
let postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, message.required],
		minlength: [6, message.tooShort],
		unique: true
	},
	text: {
		type: String,
		required: [true, message.required]
	}
});

// Подключим генератор на основе названия
postSchema.plugin(URLSlugs('title'));

// Компилируем
const Post = mongoose.model('post', postSchema);
module.exports = Post;
