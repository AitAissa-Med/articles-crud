const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    Title: String,
    Author: String,
    Resume: String,
    Content: String
}, {
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;

