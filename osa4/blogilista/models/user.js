// mongoose model for users
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
      type: String,
      required: true,
      minlength: 3,
      unique: true 
    },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

// Modify the toJSON method to change _id to id and remove __v and passwordHash
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User