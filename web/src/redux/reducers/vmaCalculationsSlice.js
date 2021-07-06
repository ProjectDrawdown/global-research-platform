import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  fetchVarpathFullVMACalculation
} from "api/api";
import objectPath from "object-path";
import { errorAdded } from "redux/reducers/util/errorSlice";

function hashCalculationParams({ varpathFull, useCorrected, useWeighted }) {
  const paramsToHash = { varpathFull, useCorrected, useWeighted };
  // TODO check to see if .values returns array in predictable order
  return Object.values(paramsToHash).toString();
}

export const doFetchVMACalculationThunk = createAsyncThunk(
  "vmaCalculations/FetchTechnologyVMACalculations",
  async ( params , thunkAPI) => {
    const vmaCalculation = await fetchVarpathFullVMACalculation(params);
    return vmaCalculation.length > 0 ? vmaCalculation[0] : [];
  },
  {
    condition: (params, { getState, extra }) => {
      const { vmaCalculations } = getState();
      const hash = hashCalculationParams(params);
      if (objectPath.get(vmaCalculations, ["requests", hash, "status"]) === "pending") {
        return false;
      } else {
        return true;
      }
    }
  }
);

const initialState = {
  requests: {},
  calculations: {}
};

const vmaCalculationsSlice = createSlice({
  name: "vmaCalculations",
  initialState,
  extraReducers: {
    [doFetchVMACalculationThunk.pending]: (state, action) => {
      const params = action.meta.arg;
      const hash = hashCalculationParams(params);
      state.requests[hash] = {
        status: "pending",
        currentRequestId: action.meta.requestId
      };
    },
    [doFetchVMACalculationThunk.rejected]: (state, action) => {
      const { requestId } = action.meta;
      const params = action.meta.arg;
      const hash = hashCalculationParams(params);
      const requestInfo = state.requests[hash];
      if (requestInfo.status === "pending" && requestInfo.currentRequestId === requestId) {
        state.requests[hash] = {
          status: "idle",
          currentRequestId: undefined,
        };
      }
    },
    [doFetchVMACalculationThunk.rejectedWithContent]: (state, action) => {
      const { requestId } = action.meta;
      const params = action.meta.arg;
      const hash = hashCalculationParams(params);
      const requestInfo = state.requests[hash];
      if (requestInfo.status === "pending" && requestInfo.currentRequestId === requestId) {
        state.requests[hash] = {
          status: "idle",
          currentRequestId: undefined,
        };
      }
    },
    [doFetchVMACalculationThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      const params = action.meta.arg;
      const { varpathFull, useCorrected, useWeighted } = params;
      const hash = hashCalculationParams(params);
      const requestInfo = state.requests[hash];
      // Check to make sure that this action was the most recent pending action.
      if (requestInfo.status === "pending" && requestInfo.currentRequestId === requestId) {
        state.requests[hash] = {
          status: "idle",
          currentRequestId: undefined,
        };
        state.calculations[hash] = {
          data: action.payload,
          params: action.params
        };
      }
    },
  },
  reducers: {
  }
});

export const varpathFullVMACalculationSelector = (state, params) => {
  const hash = hashCalculationParams(params);
  return objectPath.get(state, ["vmaCalculations", "calculations", hash, ["data"]]);
};

export default vmaCalculationsSlice.reducer;

// NEXT STEP: implement vmaCalculationsSlice in VMA component
