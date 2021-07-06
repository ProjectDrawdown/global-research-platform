/**
 * THIS FILE IS CURRENTLY UNUSED.
 *
 * The token storage and login flow must be ported over from `services/user`,
 * with possible changes to `api/api.js` as well.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  fetchUser,
  patchUser
} from "../../../api/api";
import objectPath from "object-path";
import { errorAdded } from "../util/errorSlice";

// TODO use this to load current user information on all pages
// TODO if this fails, trigger an action to remove the user obj from the state
// (log the user out)
export const doFetchCurrentUserThunk = createAsyncThunk(
  "user/fetchCurrentUser",
  async (args, thunkAPI) => {
    const user = await fetchUser();
    const obj = {
      ...user,
    };
    return obj;
  }
);

export const doFetchUserLoginURLThunk = createAsyncThunk(
  "user/fetchLoginURL",
  async (args, thunkAPI) => {
    try {
      const res = await login();
      return res.url; 
    } catch (err) {
      const errorMessage = objectPath.has(err,'detail.0.msg')
            ? err.detail[0].msg
            : "There was an error fetching the login link.";
      dispatch(errorAdded(errorMessage));
      return reject(err.response.data);
    }
  }
);

export const doPatchCurrentUserThunk = createAsyncThunk(
  "user/patchCurrentUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const patchResponse = await patchUser(data);
      return patchResponse;
    } catch (err) {
      const errorMessage = objectPath.has(err,'detail.0.msg')
            ? err.detail[0].msg
            : "There was an error updating your user.";
      dispatch(errorAdded(errorMessage));
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  extraReducers: {
    [doFetchCurrentUserThunk.pending]: (state, action) => {
      state.status = "pending";
      state.currentRequestId = action.meta.requestId;
      return state;
    },
    [doFetchCurrentUserThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      // Check to make sure that this action was the most recent pending action.
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "idle";
        state.user = action.payload;
        state.currentRequestId = undefined;
      }
      return state;
    },
    [doFetchCurrentUserThunk.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "rejected";
        state.currentRequestId = undefined;
      }
      return state;
    },
    [doFetchCurrentUserThunk.rejectedWithContent]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "rejected";
        state.currentRequestId = undefined;
      }
      return state;
    },
    [doPatchCurrentUserThunk.pending]: (state, action) => {
      state.status = "pending";
      state.currentRequestId = action.meta.requestId;
      return state;
    },
    [doPatchCurrentUserThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      // Check to make sure that this action was the most recent pending action.
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "idle";
        state.user = action.payload;
        state.currentRequestId = undefined;
      }
      return state;
    },
    [doPatchCurrentUserThunk.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "rejected";
        state.currentRequestId = undefined;
      }
      return state;
    },
    [doPatchCurrentUserThunk.rejectedWithContent]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "rejected";
        state.currentRequestId = undefined;
      }
      return state;
    },
  },
  reducers: {
  },
});

