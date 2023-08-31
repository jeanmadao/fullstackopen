import { createSlice } from "@reduxjs/toolkit";

import storageService from "../services/storage";
import loginService from "../services/login";

import { displayNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      storageService.saveUser(user);
      dispatch(displayNotification("welcome!"));
    } catch (e) {
      dispatch(displayNotification("wrong username or password", "error"));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    storageService.removeUser();
    dispatch(displayNotification("logged out"));
  };
};

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;
