const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  web_url: { type: String, required: true },
  create_date: { type: String, required: true }
});

const Book = mongoose.model("Article", articleSchema);

module.exports = Article;
