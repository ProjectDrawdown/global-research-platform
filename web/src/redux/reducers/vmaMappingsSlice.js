import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  fetchTechnologyVMAMappings
} from "api/api";
import objectPath from "object-path";
import { errorAdded } from "redux/reducers/util/errorSlice";

export const doFetchTechnologyVMAMappingsThunk = createAsyncThunk(
  "vmaMappings/FetchTechnologyVMAMappings",
  async ( technologyId , thunkAPI) => {
    const vmaMapping = await fetchTechnologyVMAMappings(technologyId);
    return vmaMapping;
  },
  {
    condition: (technologyId, { getState, extra }) => {
      const { vmaMappings } = getState();
      if (objectPath.get(vmaMappings, ["requests", technologyId, "status"]) === "pending") {
        return false;
      } else {
        return true;
      }
    }
  }
);

const initialState = {
  requests: {},
  mappings: {}
};

const vmaMappingsSlice = createSlice({
  name: "vmaMappings",
  initialState,
  extraReducers: {
    [doFetchTechnologyVMAMappingsThunk.pending]: (state, action) => {
      const technologyId = action.meta.arg;
      state.requests[technologyId] = {
        status: "pending",
        currentRequestId: action.meta.requestId
      };
    },
    [doFetchTechnologyVMAMappingsThunk.rejected]: (state, action) => {
      const { requestId } = action.meta;
      const technologyId = action.meta.arg;
      const requestInfo = state.requests[technologyId];
      if (requestInfo.status === "pending" && requestInfo.currentRequestId === requestId) {
        state.requests[technologyId] = {
          status: "idle",
          currentRequestId: undefined,
        };
      }
    },
    [doFetchTechnologyVMAMappingsThunk.rejectedWithContent]: (state, action) => {
      const { requestId } = action.meta;
      const technologyId = action.meta.arg;
      const requestInfo = state.requests[technologyId];
      if (requestInfo.status === "pending" && requestInfo.currentRequestId === requestId) {
        state.requests[technologyId] = {
          status: "idle",
          currentRequestId: undefined,
        };
      }
    },
    [doFetchTechnologyVMAMappingsThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      const technologyId = action.meta.arg;
      const requestInfo = state.requests[technologyId];
      // Check to make sure that this action was the most recent pending action.
      if (requestInfo.status === "pending" && requestInfo.currentRequestId === requestId) {
        state.requests[technologyId] = {
          status: "idle", 
          currentRequestId: undefined,
        };
        state.vmaMappings.mappings[technologyId] = action.payload; 
      }
    },
  },
  reducers: {
  }
});

export function useTechnologyVMAMappingSelector(technologyId) {
  return useSelector(
    state => objectPath.get(state, ["vmaMappings", "mappings", technologyId])
  );
}

export default vmaMappingsSlice.reducer;
