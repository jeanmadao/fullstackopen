import { useState } from 'react'
import FormInput from './FormInput'

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
      <form onSubmit={login}>
        <FormInput
          desc='username'
          type='text'
          val={username}
          name='Username'
          onChange={inputHandler(setUsername)}
        />
        <FormInput
          desc='password'
          type='password'
          val={password}
          name='Password'
          onChange={inputHandler(setPassword)}
        />
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
