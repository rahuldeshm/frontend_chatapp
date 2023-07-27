import { createSlice } from "@reduxjs/toolkit";

const initialState = { messages: [] };

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
