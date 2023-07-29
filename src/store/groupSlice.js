import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  active: {},
  on: false,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup(state, action) {
      state.groups = [action.payload, ...state.groups];
    },
    addGroups(state, action) {
      state.groups = action.payload;
    },
    setOn(state, action) {
      state.on = action.payload;
    },
    setActive(state, action) {
      state.active = action.payload;
      state.on = true;
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
