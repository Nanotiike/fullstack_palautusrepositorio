// mongoose model for blog posts
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

module.exports = mongoose.model('Blog', blogSchema)