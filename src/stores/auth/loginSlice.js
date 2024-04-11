import { createSlice } from "@reduxjs/toolkit";
import { LoginAction } from "./loginAction";

const initialState = {
  loginInfo: {},
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [LoginAction.fulfilled]: (state, action) => {
      state.loginInfo = action.payload;
    },
  },
});

export const loginInfo = (state) => state.auth.loginInfo;
export default loginSlice.reducer;
