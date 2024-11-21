const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favouriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length == 0) {
    return null
  }
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favouriteBlog = blogs.find(blog => blog.likes === maxLikes)
  returnValue = {
    title: favouriteBlog.title,
    author: favouriteBlog.author,
    likes: favouriteBlog.likes
  }
  return returnValue
  }

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length == 0) {
    return null
  }
  // Need to find all authors and then find who has the most blogs written and return their name and the amount of blogs they have written
  const authors = []
  for (let i = 0; i < blogs.length; i++) {
    if (authors.includes(blogs[i].author)) {
      continue
    }  
    authors.push(blogs[i].author)
  }
  const authorCount = {}
  for (let i = 0; i < authors.length; i++) {
    authorCount[authors[i]] = 0
    for (let j = 0; j < blogs.length; j++) {
      if (blogs[j].author === authors[i]) {
        authorCount[authors[i]]++
      }
    }
  }
  const maxBlogs = Math.max(...Object.values(authorCount))
  const mostBlogsAuthor = Object.keys(authorCount).find(key => authorCount[key] === maxBlogs)
  returnValue = {
    author: mostBlogsAuthor,
    blogs: maxBlogs
  }
  return returnValue
}

const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length == 0) {
    return null
  }
  // Need to find all authors and then find who has the most likes and return their name and the amount of likes they have
  const authors = []
  for (let i = 0; i < blogs.length; i++) {
    if (authors.includes(blogs[i].author)) {
      continue
    }  
    authors.push(blogs[i].author)
  }
  const authorCount = {}
  for (let i = 0; i < authors.length; i++) {
    authorCount[authors[i]] = 0
    for (let j = 0; j < blogs.length; j++) {
      if (blogs[j].author === authors[i]) {
        authorCount[authors[i]]+= blogs[j].likes
      }
    }
  }
  const maxLikes = Math.max(...Object.values(authorCount))
  const mostLikesAuthor = Object.keys(authorCount).find(key => authorCount[key] === maxLikes)
  returnValue = {
    author: mostLikesAuthor,
    likes: maxLikes
  }
  return returnValue

}

  module.exports = {
    dummy, 
    totalLikes, 
    favouriteBlog,
    mostBlogs,
    mostLikes
  }