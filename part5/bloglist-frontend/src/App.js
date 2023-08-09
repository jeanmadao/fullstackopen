import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const inputHandler = (setter) => ({ target }) => setter(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (user) {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <BlogsList blogs={blogs} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>login</h2>
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
