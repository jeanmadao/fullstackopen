import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    removeBlogUser(state, action) {
      const blogToRemove = action.payload;
      const user = state.find((user) => user.id === blogToRemove.user.id);
      const indexToRemove = state.findIndex(
        (blog) => blog.id === blogToRemove.id,
      );
      user.blogs.splice(indexToRemove, 1);
    },
    addBlogUser(state, action) {
      const blog = action.payload;
      const user = state.find((user) => user.id === blog.user.id);
      user.blogs.push(blog);
    },
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { addBlogUser, removeBlogUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
