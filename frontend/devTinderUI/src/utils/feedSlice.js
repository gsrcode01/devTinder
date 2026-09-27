import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    appendFeed: (state, action) => {
      if (!state) return action.payload;
      const existingIds = new Set(state.map((u) => u._id));
      const uniqueNewUsers = action.payload.filter((u) => !existingIds.has(u._id));
      return [...state, ...uniqueNewUsers];
    },
    removeUserFromFeed: (state, action) => {
      if (!state) return null;
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, appendFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
