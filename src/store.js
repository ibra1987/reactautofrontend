import { configureStore } from "@reduxjs/toolkit";
import candidatsReducer from "./features/candidatsSlice";
import autoSlice from "./features/autoSlice";

export const store = configureStore({
  reducer: {
    candidats: candidatsReducer,
    autos: autoSlice,
  },
});
