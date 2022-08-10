import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import candidatsService from "../http/candidatsService";

const initialState = {
  candidats: [],
  selectedCandidat: null,
  message: "",
  isLoading: false,
  error: "",
};

export const getCandidats = createAsyncThunk(
  "getCandidats",
  async (_, thunkAPI) => {
    try {
      return await candidatsService.getCandidats();
    } catch (error) {
      const errMessage = error.response.data.error || error.errMessage;
      return thunkAPI.fulfillWithValue(errMessage);
    }
  }
);
//add candidat
export const createCandidat = createAsyncThunk(
  "createCandidat",
  async (candidatInfo, thunkAPI) => {
    try {
      return await candidatsService.addCandidat(candidatInfo);
    } catch (error) {
      const errMessage = error.response.data.error || error.errMessage;
      return thunkAPI.fulfillWithValue(errMessage);
    }
  }
);
export const editCandidat = createAsyncThunk(
  "editCandidat",
  async (candidatInfo, thunkAPI) => {
    try {
      return await candidatsService.editCandidat(candidatInfo);
    } catch (error) {
      const errMessage = error.response.data.error || error.errMessage;
      return thunkAPI.fulfillWithValue(errMessage);
    }
  }
);

export const candidatsSlice = createSlice({
  name: "candidats",
  initialState,
  reducers: {
    resetMessage: (state) => {
      setTimeout(() => {
        state.message = "";
        state.error = "";
      }, 3000);
    },
    getSingleCandidat: (state, action) => {
      state.selectedCandidat = state.candidats.find(
        (candidat) => candidat._id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCandidats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCandidats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidats = action.payload.data;
      })
      .addCase(getCandidats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.candidats = [];
      })
      .addCase(createCandidat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCandidat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.candidats.unshift(action.payload.new);
      })
      .addCase(createCandidat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editCandidat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCandidat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCandidat = "";
        state.message = action.payload.message;
        state.candidats = state.candidats.map((candidat) =>
          candidat._id !== action.payload.updated._id
            ? candidat
            : action.payload.updated
        );
      })
      .addCase(editCandidat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetMessage, getSingleCandidat } = candidatsSlice.actions;

export default candidatsSlice.reducer;
