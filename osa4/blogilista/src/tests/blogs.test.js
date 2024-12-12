const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('assert')

const api = supertest(app)

const initialBlogs = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    id: '5a422aa71b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Vanonical_string_reduction.html',
    likes: 10,
    __v: 0
  },
  {
    id: '5a422aa71b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 12,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})
  
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 3)
})

test('blog identifying field is id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.ok(blog.id, 'id exists');
  assert.strictEqual(typeof blog.id, 'string', 'id is a string')
  assert.strictEqual(blog._id, undefined, '_id does not exist')
})

test('adding a blog works', async () => {
  const newBlog = {
    title: 'TestingTestingTesting',
    author: 'Testimies',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestingTestingTesting.html',
    likes: 15,
    __v: 0
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)

  const titles = blogsAtEnd.body.map(blog => blog.title)
  assert.ok(titles.includes('TestingTestingTesting'))
})

test('likes is 0 if not given a value', async () => {
  const newBlog = {
    title: 'TestingTestingTesting',
    author: 'Testimies',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestingTestingTesting.html',
    __v: 0
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Content-Type', 'application/json')
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog is not added if title, author or url is not given', async () => {
  const newBlog = {
    author: 'Testimies',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestingTestingTesting.html',
    __v: 0
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Content-Type', 'application/json')
    .expect(400)

    const newBlog2 = {
      title: 'TestingTestingTesting',
      author: 'Testimies',
      __v: 0
    }
    const response2 = await api
      .post('/api/blogs')
      .send(newBlog2)
      .set('Content-Type', 'application/json')
      .expect(400)

  const newBlog3 = {
      title: 'TestingTestingTesting',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestingTestingTesting.html',
      __v: 0
    }
    const response3 = await api
      .post('/api/blogs')
      .send(newBlog3)
      .set('Content-Type', 'application/json')
      .expect(400)
})

test('blog is deleted correclty', async () => {
  const newBlog = {
    title: 'TestingTestingTesting',
    author: 'Testimies',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestingTestingTesting.html',
    likes: 15,
    __v: 0
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Content-Type', 'application/json')
    .expect(201)

  const blogToDelete = response.body

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  const titles = blogsAtEnd.body.map(blog => blog.title)

  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
  assert.ok(!titles.includes('TestingTestingTesting'))
})

after(async () => {
  await mongoose.connection.close()
})