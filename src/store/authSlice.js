import { createSlice } from "@reduxjs/toolkit";
// import { io } from "socket.io-client";

const token = JSON.parse(localStorage.getItem("token"));
// const socket = io("http://localhost:3001", {
//   auth: token,
// });

const initialState = {
  token,
  // socket,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logOut(state, action) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
