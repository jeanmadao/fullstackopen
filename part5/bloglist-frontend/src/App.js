import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const sendNotification = (status, message) => {
    if (status === 'success') {
      setSuccessMessage(message)
    } else if (status === 'error') {
      setErrorMessage(message)
    }
    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (loginRequest) => {
    try {
      const user = await loginService.login(loginRequest)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      sendNotification('success', 'successfully logged in')
    } catch (exception) {
      sendNotification('error', 'wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    sendNotification('success', 'successfully logged out')
  }

  const createBlog = async (blogRequest) => {
    try {
      const returnedBlog = await blogService.create(blogRequest)
      setBlogs(blogs.concat(returnedBlog))
      sendNotification('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      sendNotification('error', 'failed to create new blog')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user) {
    return (
      <div>
        <h2>Blogs</h2>
        {successMessage && <Notification status="success" message={successMessage} />}
        {errorMessage && <Notification status="error" message={errorMessage} />}
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <BlogsList blogs={blogs} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        {successMessage && <Notification status="success" message={successMessage} />}
        {errorMessage && <Notification status="error" message={errorMessage} />}
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }
}

export default App
