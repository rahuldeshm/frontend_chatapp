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
    removeGroup(state, action) {
      const g = [...state.groups];
      const fg = g.filter((e) => e.id !== action.payload);
      state.groups = fg;
      state.active = {};
      state.on = false;
    },
    changeName(state, action) {
      const a = { ...state.active };
      a.name = action.payload.name;
      const g = [...state.groups];
      const fg = g.map((e) => (e.id !== action.payload.id ? e : a));
      state.active = a;
      state.groups = fg;
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
