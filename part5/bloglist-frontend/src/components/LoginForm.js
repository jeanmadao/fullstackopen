import { useState } from 'react'
import FormInput from './FormInput'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const inputHandler = (setter) => ({ target }) => setter(target.value)

  const login = (event) => {
    event.preventDefault()

    handleLogin({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>login</h2>
      <form onSubmit={login} id="login-form">
        <FormInput
          desc='username'
          type='text'
          val={username}
          name='Username'
          onChange={inputHandler(setUsername)}
          id='username'
        />
        <FormInput
          desc='password'
          type='password'
          val={password}
          name='Password'
          onChange={inputHandler(setPassword)}
          id='password'
        />
        <button type='submit' id='login-btn'>login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
