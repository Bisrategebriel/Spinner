import { configureStore } from "@reduxjs/toolkit";
import spinnReducer from "./spinn/spinnSlice";
import loginSlice from "./auth/loginSlice";

export const store = configureStore({
  reducer: {
    Spinn: spinnReducer,
    login: loginSlice,
  },
});
