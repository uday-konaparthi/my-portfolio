import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSection: null,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setSelectedSection(state, action) {
      state.selectedSection = action.payload;
    },
  },
});

export const { setSelectedSection } = sectionSlice.actions;
export default sectionSlice.reducer;
