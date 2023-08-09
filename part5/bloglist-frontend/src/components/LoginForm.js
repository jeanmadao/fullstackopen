import FormInput from './FormInput'

const LoginForm = (props) => {
  return (
    <>
      <form onSubmit={props.loginHandler}>
        <FormInput
          desc='username'
          type='text'
          val={props.username}
          name='Username'
          onChange={props.usernameHandler}
        />
        <FormInput
          desc='password'
          type='password'
          val={props.password}
          name='Password'
          onChange={props.passwordHandler}
        />
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
