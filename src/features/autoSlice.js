import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import autoService from "../http/autoService";

const initialState = {
  autos: [],
  all: false,
  selectedAuto: "Akka",
  error: "",
};

export const getAutos = createAsyncThunk("getAutos", async (_, thunkPI) => {
  try {
    return await autoService.getAutoEcoles();
  } catch (error) {
    const errMessage = error.response.data.error || error.errMessage;
    return thunkPI.rejectWithValue(errMessage);
  }
});

export const autoSlice = createSlice({
  name: "autos",
  initialState,
  reducers: {
    setSelectedAuto: (state, action) => {
      state.selectedAuto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAutos.pending, (state) => {
        return state;
      })
      .addCase(getAutos.fulfilled, (state, action) => {
        state.autos = action.payload.data;
      })
      .addCase(getAutos.rejected, (state, action) => {
        state.autos = [];
        state.error = action.payload.error;
      });
  },
});

export const { setSelectedAuto } = autoSlice.actions;
export default autoSlice.reducer;
