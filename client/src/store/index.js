import { configureStore } from "@reduxjs/toolkit";
import infobase from "./infoSlice";

export const store = configureStore({
  reducer: {
    infobase: infobase,
  },
});
