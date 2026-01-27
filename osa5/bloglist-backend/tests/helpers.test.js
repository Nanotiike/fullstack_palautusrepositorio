const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/blog-post',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has multiple blogs equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 15)
  })
})

describe('favourite blog', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/blog-post',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has multiple blogs returns the blog with most likes', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      title: 'Another Blog Post',
      author: 'Jane Smith',
      likes: 10
    })
  })

  const listWithMultipleBlogs2 = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/blog-post',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has multiple blogs with the same amount of likes, returns one of the blogs with most likes', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs2)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 10
    })
  })
})

describe('most blogs', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/blog-post',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Yet Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/another-blog-post',
      likes: 10,
      __v: 0
    }
  ]
  
  test('when list has multiple blogs returns the author with most blogs and the amount of blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Jane Smith',
      blogs: 2
    })
  })

  const listWithMultipleBlogs2 = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/blog-post',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has multiple blogs with authors who have written the same number of blogs, returns one of the authors with most blogs and the amount of blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs2)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
})

describe('most likes', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/blog-post',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Yet Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/another-blog-post',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has multiple blogs returns the author with most likes and the amount of likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Jane Smith',
      likes: 20
    })
  })
  const listWithMultipleBlogs2 = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog Post',
      author: 'Jane Smith',
      url: 'http://example.com/blog-post',
      likes: 10,
      __v: 0
    }
  ]
  test('when list has multiple blogs with authors who have same amount of likes, returns one of the authors with most likes and the amount of likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs2)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 10
    })
  })
})

      