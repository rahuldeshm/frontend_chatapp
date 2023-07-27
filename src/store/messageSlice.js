import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const initialState = { messages: [], socket };

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    fetchedMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
