import { configureStore } from "@reduxjs/toolkit";
import sectionReducer from "./slice/sectionSlice";
import themeReducer from './slice/themeSlice'

const Store = configureStore({
  reducer: {
    section: sectionReducer,
    theme: themeReducer,
  },
});

export default Store;
