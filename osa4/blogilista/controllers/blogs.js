// Router for blog related endpoints
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  .populate('user', { username: 1, name: 1 })

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor,async (request, response, next) => {
  const blog = request.body

  const user = request.user

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: user._id
  })

  try {
      const result = await newBlog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
    } catch (error) {
      response.status(400).json({ error: error.message})
    }
})

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.status(200).json(updatedBlog)
    } catch (error) {
      response.status(400).json({ error: error.message})
    }
  })

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id

  const user = request.user

  try {
    const blog = await Blog.findById(id)
    if (blog) {
      if ( blog.user.toString() === user._id.toString() ){
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
      } 
      else {{
        response.status(401).json({ error: 'only the creator can delete a blog' })
      }}
    } else {
      response.status(404).json({ error: 'blog not found' })
    }
  } catch (error) {
    response.status(400).json({ error: error.message })
  } 
})

module.exports = blogsRouter