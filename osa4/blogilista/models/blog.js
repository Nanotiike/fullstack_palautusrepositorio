// mongoose model for blog posts
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// Modify the toJSON method to change _id to id and remove __v
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // Only convert user to string if it's an ObjectId, leave populated objects as-is
    if (returnedObject.user && typeof returnedObject.user.toString === 'function' && returnedObject.user.constructor.name === 'ObjectId') {
      returnedObject.user = returnedObject.user.toString()
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)