import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    removeBlog(state, action) {
      const id = action.payload;
      const indexToRemove = state.findIndex((blog) => blog.id === id);
      state.splice(indexToRemove, 1);
    },
    updateBlog(state, action) {
      const { id, returnedBlog } = action.payload;
      const indexToUpdate = state.findIndex((blog) => blog.id === id);
      state[indexToUpdate] = returnedBlog;
      state.sort((a, b) => b.likes - a.likes);
    },
    createBlog(state, action) {
      const returnedBlog = action.payload;
      state.push(returnedBlog);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const like = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blogToLike = blogs.find((blog) => blog.id === id);
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };
    const returnedBlog = await blogService.update(updatedBlog);
    dispatch(updateBlog({ id, returnedBlog }));
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const create = (blogToCreate) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(blogToCreate);
    dispatch(createBlog(returnedBlog));
  };
};

export const { setBlogs, updateBlog, removeBlog, createBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
