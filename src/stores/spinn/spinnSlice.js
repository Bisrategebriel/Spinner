import { createSlice } from "@reduxjs/toolkit";
import { getSpinnData, getSpinResult } from "./spinnAction";

const initialState = {
  spinData: {},
  prevData: {},
  spinResult: {},
  serverTime: "",
};

const SpinnSlice = createSlice({
  name: "Spinn",
  initialState,
  reducers: {},
  extraReducers: {
    [getSpinnData.fulfilled]: (state, { payload }) => {
      state.spinData = payload.spinnData;
      state.prevData = payload.prevData;
      state.serverTime = payload.serverTime;
    },
    [getSpinResult.fulfilled]: (state, { payload }) => {
      state.spinResult = payload;
    },
  },
});

export const spinnData = (state) => state.Spinn.spinData;
export const prevData = (state) => state.Spinn.prevData;
export const serverTime = (state) => state.Spinn.serverTime;
export const spinResult = (state) => state.Spinn.spinResult;
export default SpinnSlice.reducer;
