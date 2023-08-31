import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import storageService from "./services/storage";

import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { logout, setUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    const storageUser = storageService.loadUser();
    dispatch(setUser(storageUser));
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>
      <Togglable buttonLabel="new note">
        <NewBlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
