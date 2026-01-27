import blogService from '../services/blogs'

const AddBlogForm = ({ blogs, setBlogs, setMessage, setMessageType }) => {
  const addBlog = async (event) => {
    event.preventDefault()

    // Blog object
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }

    // Try to add the blog
    try {
      const returnedBlog = await blogService.addBlog(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setMessageType('success')
      setTimeout(() => {
      setMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Failed to add blog:', error)
      setMessage('failed to add blog')
      setMessageType('error')
      setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  }

  // Form for adding a blog
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              name="title"
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              name="author"
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              name="url"
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AddBlogForm