import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import storageService from "./services/storage";

import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { setUser } from "./reducers/loginReducer";
import UserList from "./components/UserList";
import { initializeUsers } from "./reducers/userReducer";
import { Route, Routes } from "react-router-dom";
import User from "./components/User";
import Blog from "./components/Blog";
import Menu from "./components/Menu";
import { styled } from "styled-components";

const StyledApp = styled.div`
  background: #282828;
  min-height: 100vh;
  color: #ebdbb2;
`;

const Main = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

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

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) {
    return (
      <StyledApp>
        <Main>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </Main>
      </StyledApp>
    );
  }

  return (
    <StyledApp>
      <Menu />
      <Main>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <BlogList />
                <Togglable buttonLabel="new note">
                  <NewBlogForm />
                </Togglable>
              </div>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Main>
    </StyledApp>
  );
};

export default App;
