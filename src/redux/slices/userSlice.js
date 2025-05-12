import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    isLoading: false,
    user: null,
    access_token: null,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.login.isLoading = true;
      state.login.error = null;
    },
    loginSuccess: (state, action) => {
      state.login.isLoading = false;
      state.login.user = { ...action.payload.user };
      state.login.access_token = action.payload.access_token;
      state.login.error = null;
    },
    loginFail: (state, action) => {
      state.login.isLoading = false;
      state.login.user = null;
      state.login.access_token = null;
      state.login.error = action.payload;
    },
    logoutRedux: (state) => {
      state.login.isLoading = false;
      state.login.user = null;
      state.login.access_token = null;
      state.login.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRedux,
  refreshTokenFail,
  refreshTokenSuccess,
} = userSlice.actions;

export default userSlice.reducer;
