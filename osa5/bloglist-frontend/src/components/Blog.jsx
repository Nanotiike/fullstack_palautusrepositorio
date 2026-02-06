import { useState } from 'react'
import blogService from '../services/blogs'

// Component to display a single blog with toggleable details and like functionality
const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Function to handle liking a blog
  const handleLike = async () => {
    blog.likes += 1
    const updatedBlog = await blogService.addLike(blog.id, blog)
    const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
    setBlogs(updatedBlogs)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.removeBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  console.log('Debugging blog:', {
    blogTitle: blog.title,
    blogUser: blog.user,  // Check if this is an object {name: 'tt', ...} or something else
    userName: user.name,  // Should be 'tt' from login
    user: user,  // Check the entire user object
    conditionResult: blog.user?.id === user.id  // Logs true/false
  });

  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.author}</p>
        {blog.user.id === user.id && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog