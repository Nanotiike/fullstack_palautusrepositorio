import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlog.jsx'
import Notification from './components/Notification.jsx'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <h2>log in to application</h2>,
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogsForm = () => (
    <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={message} type={messageType} />
      
      {!user && loginForm()}
      {user && (
      <div>
        <p>{user.name} logged in 
          <button onClick={() => {
            window.localStorage.removeItem('loggedNoteappUser')
            setUser(null)
          }}>
            logout
          </button>
        </p>
        <AddBlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setMessageType={setMessageType} />
        {blogsForm()}
      </div>
    )}
    </div>
  )
}

export default App