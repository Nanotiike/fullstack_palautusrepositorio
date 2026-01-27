const { test, describe, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const Helper = require('./test_helper')
const { app, connectToDatabase } = require('../app')

const api = supertest(app)

let token

before(async () => {
  await connectToDatabase()
})

beforeEach(async () => {
  await User.deleteMany({})
  
  // Create test user with properly hashed password
  const testUser = await Helper.createTestUser()
  await User.create(testUser)

  await Blog.deleteMany({})
  await Blog.insertMany(Helper.initialBlogs)

  // Get token for authenticated requests
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser1', password: 'testing' })
    .expect(200)
  
  token = loginResponse.body.token
})

describe('connection to blog api and retrieving blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtStart = await Helper.blogsInDb()

    assert.strictEqual(blogsAtStart.length, Helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const blogsAtStart = await Helper.blogsInDb()
    const BlogToView = blogsAtStart[0]

    const resultNote = await api
      .get(`/api/blogs/${BlogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Check that all the blog properties match (user will be populated as an object from the API)
    assert.strictEqual(resultNote.body.title, BlogToView.title)
    assert.strictEqual(resultNote.body.author, BlogToView.author)
    assert.strictEqual(resultNote.body.url, BlogToView.url)
    assert.strictEqual(resultNote.body.likes, BlogToView.likes)
    assert.strictEqual(resultNote.body.id, BlogToView.id)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      userId: '697381a6b5ffd379a8fcd9fb'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Helper.blogsInDb()
    const contents = blogsAtEnd.map(r => r.title)

    assert.strictEqual(blogsAtEnd.length, Helper.initialBlogs.length + 1)

    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('blog without content is not added', async () => {
    const newBlog = {
      title: ''
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, Helper.initialBlogs.length)
  })

  test('blog identifying field is id', async () => {
    const blogsAtEnd = await Helper.blogsInDb()
    const blog = blogsAtEnd[0]
    assert.ok(blog.id, 'id exists');
    assert.strictEqual(typeof blog.id, 'string', 'id is a string')
    assert.strictEqual(blog._id, undefined, '_id does not exist')
  })

  test('if likes property is missing, it defaults to zero', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Test Author',
      url: 'http://example.com',
      userId: '697381a6b5ffd379a8fcd9fb'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Helper.blogsInDb()
    const blog = blogsAtEnd[blogsAtEnd.length - 1]
    assert.strictEqual(blog.likes, 0)
  })

  test('adding a blog fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Blog without token',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    const blogsAtEnd = await Helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, Helper.initialBlogs.length)
  })
})

describe('updating and deleting a blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await Helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlogData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await Helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Helper.blogsInDb()

    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, Helper.initialBlogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})