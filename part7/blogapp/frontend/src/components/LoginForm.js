import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { login } from "../reducers/loginReducer";

const LoginForm = () => {
  const { clear: clearUsernameField, ...usernameField } = useField(
    "text",
    "username",
  );
  const { clear: clearPasswordField, ...passwordField } = useField(
    "password",
    "password",
  );

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(usernameField.value, passwordField.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input {...usernameField} />
      </div>
      <div>
        password
        <input {...passwordField} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
