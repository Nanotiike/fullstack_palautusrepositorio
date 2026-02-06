const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Route for resetting the database - only used in test environment
router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router