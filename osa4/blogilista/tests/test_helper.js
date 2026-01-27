const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash('testing', 10)
  return {
    _id: new mongoose.Types.ObjectId('697381a6b5ffd379a8fcd9fb'),
    username: 'testuser1',
    name: 'Test User One',
    passwordHash
  }
}

const initialBlogs = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: new mongoose.Types.ObjectId('697381a6b5ffd379a8fcd9fb')
  },
  {
    id: '5a422aa71b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Vanonical_string_reduction.html',
    likes: 10,
    user: new mongoose.Types.ObjectId('697381a6b5ffd379a8fcd9fb')
  },
  {
    id: '5a422aa71b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 12,
    user: new mongoose.Types.ObjectId('697381a6b5ffd379a8fcd9fb')
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, createTestUser, nonExistingId, blogsInDb, usersInDb
}