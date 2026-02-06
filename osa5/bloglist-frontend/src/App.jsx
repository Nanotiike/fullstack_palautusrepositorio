import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlog.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const togglableRef = useRef(null)

  // Fetch blogs when the user logs in
  useEffect(() => {
    if (user) {  
      blogService.getAll().then(blogs => setBlogs(blogs));
    }
    console.log('App: Blogs fetched after login:', blogs);
  }, [user]); 

  // Check for logged in user on component mount
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Handle user login
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

  // Function to render the login form
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

  // Function to render the list of blogs, sorted by likes
  const showBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    console.log('App: Rendering blogs:', sortedBlogs.map(b => ({ title: b.title, user: b.user })));

    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
        )}
      </div>
    )
  }

  // Main render function
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
          <Togglable ref={togglableRef} buttonLabel="new blog">
            <AddBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setMessage={setMessage}
              setMessageType={setMessageType}
              onBlogAdded={() => togglableRef.current.toggleVisibility()} />
          </Togglable>
          {showBlogs()}
        </div>
      )}
    </div>
  )
}

export default App