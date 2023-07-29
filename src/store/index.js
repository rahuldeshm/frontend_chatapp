import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import messageSlice from "./messageSlice";
import groupSlice from "./groupSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    message: messageSlice,
    group: groupSlice,
  },
});

export default store;
