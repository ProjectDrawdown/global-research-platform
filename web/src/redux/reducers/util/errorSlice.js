import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  detail: null
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    errorAdded(state, action) {
      return {
        ...state,
        detail: action.payload.message,
        type: action.payload.type,
        title: action.payload.title
      };
    },
    clearError(state, action) {
      return {
        ...state,
        detail: null
      };
    }
  }
});

export const { errorAdded, clearErrors } = errorSlice.actions;

export default errorSlice.reducer;
