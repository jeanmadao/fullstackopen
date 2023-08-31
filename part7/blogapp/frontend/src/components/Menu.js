import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/loginReducer";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  const menuStyle = {
    backgroundColor: "lightgrey",
    display: "flex",
    gap: 10,
  };

  return (
    <div style={menuStyle}>
      <Link to={"/"}>blogs</Link>
      <Link to={"/users"}>users</Link>
      <span>{user.username} logged in</span>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};

export default Menu;
