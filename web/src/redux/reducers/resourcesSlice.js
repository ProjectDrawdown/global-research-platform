/**
 * @fileOverview UNTESTED initial pass at a generic resource loading slice
 * @name resourcesSlice.js
 * @author ethna@colab.coop
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  fetchResourceURL
} from "api/api";
import objectPath from "object-path";
import { errorAdded } from "redux/reducers/util/errorSlice";

export const doFetchResourceURLThunk = createAsyncThunk(
  "resources/FetchResourceURL",
  async ( resourceURL , thunkAPI) => {
    const vmaResources = await fetchResourceURL(resourceURL);
    return vmaResources;
  },
  {
    condition: (resourceURL, { getState, extra }) => {
      const { resources } = getState();
      if (objectPath.get(resources, ["requests", resourceURL, "status"]) === "pending") {
        return false;
      } else {
        return true;
      }
    }
  }
);

const initialState = {
  requests: {},
  resourcess: {}
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  extraReducers: {
    [doFetchResourceURLThunk.pending]: (state, action) => {
      const resourceURL = action.meta.arg;
      state.requests[resourceURL] = {
        status: "pending",
        currentRequestId: action.meta.requestId
      };
    },
    // FIXME add error handing on rejection, clear current resuest status
    [doFetchResourceURLThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      const resourceURL = action.meta.arg;
      const requestInfo = state.requests[resourceURL];
      // Check to make sure that this action was the most recent pending action.
      if (requestInfo.status === "pending" && requestInfo.currentRequestId === requestId) {
        state.requests[resourceURL] = {
          status: "idle", 
          currentRequestId: undefined,
        };
        state.resourcess[resourceURL] = action.payload; 
      }
    },
  },
  reducers: {
  }
});

export function useResourceURLSelector(technologyID) {
  return useSelector(
    state => objectPath.get(state, ["resources", "resourcess", technologyID])
  );
}

export default resourcesSlice.reducer;
