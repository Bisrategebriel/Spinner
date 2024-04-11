import { Spinnaxios } from "../../services/api/axios";
import spinResultaxios from "../../services/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSpinnData = createAsyncThunk("Spinn/getall", async (time) => {
  try {
    const resp = await Spinnaxios.get("");
    const spinnData = resp.data.game.find((game) => game.type === "SpinAndWin");
    const prevData = resp.data.prevData;
    const serverTime = resp.data.serverTime;

    return { spinnData, prevData, serverTime };
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message, { appearance: "error" });
    } else {
      console.log(error.message, { appearance: "error" });
    }
  }
});

export const getSpinResult = createAsyncThunk(
  "Spinn/getSpinResult",
  async (id, thunkAPI) => {
    const spinResultAxios = spinResultaxios(id);

    try {
      const resp = await spinResultAxios.get();
      const spinResult = resp.data;
      return spinResult;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message, { appearance: "error" });
      } else {
        console.log(error.message, { appearance: "error" });
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
