import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const inputHandler = (setter) => ({ target }) => setter(target.value)

  const sendNotification = (status, message) => {
    if (status === 'success') {
      setSuccessMessage(message)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } else if (status === 'error') {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const createBlog = async (event) => {
    event.preventDefault()

    const blogRequest = {
      title,
      author,
      url,
    }
    const returnedBlog = await blogService.create(blogRequest)
    setBlogs(blogs.concat(returnedBlog))
    sendNotification('success', `a new blog ${title} by ${author} added`)
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
        <BlogForm
          title={title}
          author={author}
          url={url}
          titleHandler={inputHandler(setTitle)}
          authorHandler={inputHandler(setAuthor)}
          urlHandler={inputHandler(setUrl)}
          createBlog={createBlog}
        />
        <BlogsList blogs={blogs} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>login</h2>
        {successMessage && <Notification status="success" message={successMessage} />}
        {errorMessage && <Notification status="error" message={errorMessage} />}
        <LoginForm
          username={username}
          password={password}
          usernameHandler={inputHandler(setUsername)}
          passwordHandler={inputHandler(setPassword)}
          loginHandler={handleLogin}
        />
      </div>
    )
  }
}

export default App
