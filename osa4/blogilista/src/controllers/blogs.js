
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', async (request, response) => {
    
    const blog = new Blog(request.body)
  
    try {
      const result = await blog.save()
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
      response.status(201).json(updatedBlog)
    } catch (error) {
      response.status(400).json({ error: error.message})
    }
  })

  blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id
    
    try {
      const blog = await Blog.findByIdAndDelete(id)
      if (blog) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'blog not found' })
      }
    } catch (error) {
      response.status(400).json({ error: error.message })
    } 
  })



module.exports = blogsRouter