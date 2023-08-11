import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'

import loginService from './services/login'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import BlogsList from './components/BlogsList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

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
      blogFormRef.current.toggleVisibility()
      sendNotification('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      sendNotification('error', 'failed to create new blog')
    }
  }

  const updateBlog = async (blogId, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(blogId, updatedBlog)
      setBlogs(blogs
        .map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)
        .sort((a, b) => a.likes < b.likes ? 1 : -1)
      )
    } catch (exception) {
      sendNotification('error', 'failed to update the blog')
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (exception) {
      sendNotification('error', 'failed to remove the blog')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
      setBlogs(blogs)
    })
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
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <BlogsList
          blogs={blogs}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
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
