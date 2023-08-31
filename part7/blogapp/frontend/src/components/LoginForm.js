import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { login } from "../reducers/loginReducer";

const LoginForm = () => {
  const username = useField("text", "username");
  const password = useField("password", "password");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(username.value, password.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
