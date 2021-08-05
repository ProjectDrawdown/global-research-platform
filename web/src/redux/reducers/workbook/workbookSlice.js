import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWorkbook,
  cloneWorkbook,
  patchWorkbook,
  fetchData,
  updateVariation,
  runCalculation,
  fetchResources
} from "../../../api/api";
import objectPath from "object-path";
import { errorAdded } from "../util/errorSlice";

export const doFetchWorkbookThunk = createAsyncThunk(
  "workbook/fetchWorkbook",
  async ({ id }, thunkAPI) => {
    const workbook = await fetchWorkbook(id);
    const scenario = await fetchData(
      workbook.variations[0].scenario_parent_path
    );
    const reference = await fetchData(
      workbook.variations[0].reference_parent_path
    );
    const obj = {
      ...workbook,
      scenario,
      reference
    };
    return obj;
  }
);

// We currently let the API handle assigning values to a data object or directly to a prop.
// The current implementation assumes a .value prop when there may be VMA data,
// or directly to a prop if not.
// TODO update to handle adding VMA data as well, if needed, or remove .value
// from structure altogether if VMA data is now fully extracted
function helperStripVarpathValue(value) {
  return value.replace(".value", "");
}

export const doUpdateWorkbookVariationVariableThunk = createAsyncThunk(
  "workbook/commitVariationVariableUpdate",
  async (
    {
      workbookId,
      variationIndex,
      technology,
      varpathFull,
      target,
      newValue,
      oldValue
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState();
      if (!state.workbook.workbook || !state.workbook.workbook.ui) {
        throw Error("Workbook not loaded");
      }
      const workbook = state.workbook;
      const data = {
        ...workbook.workbook.variations[variationIndex]
      };
      const patchResponse = await updateVariation(
        { workbookId, variationIndex },
        data
      );
      return patchResponse;
    } catch (err) {
      if (err.detail) dispatch(errorAdded(err.detail[0].msg));
      return rejectWithValue(err.response.data);
    }
  }
);

export const doCloneAndPatchWorkbookThunk = createAsyncThunk(
  "workbook/cloneAndPatch",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const cloneResponse = await cloneWorkbook(parseInt(id));
      const patchResponse = await patchWorkbook(cloneResponse.id, data);
      return patchResponse;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const doEditDetailsPatchWorkbookThunk = createAsyncThunk(
  "workbook/editDetailsPatch",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const patchResponse = await patchWorkbook(id, data);
      return patchResponse;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Helper functions for adding/removing portfolio technologies so we don't need
// to duplicate in all our reducers and thunks.
function helperAddPortfolioTechnology(state, technology) {
  if (!state.workbook) {
    // TODO handle this error explicitly
    throw new Error("No workbook loaded, cannot update.");
  }
  const workbook = state.workbook;
  const ui = workbook.ui || {};
  const portfolioSolutions = [...(ui.portfolioSolutions || []), technology];
  return portfolioSolutions;
}

function helperRemovePortfolioTechnology(state, technology) {
  if (!state.workbook) {
    // TODO handle this error explicitly
    throw new Error("No workbook loaded, cannot update.");
  }
  const workbook = state.workbook;
  const ui = workbook.ui || {};
  const portfolioSolutions = [...(ui.portfolioSolutions || [])].filter(
    t => t !== technology
  );
  return portfolioSolutions;
}

/**
 * Takes care of patching and optimistically updating the workbook state with an
 * additional portfolio in the ui.portfolioSolutions array.
 *
 * This is a special case of patching a workbook that is safe to update
 * optimistically if we implement specific revert logic.
 */
export const doAddPortfolioTechnologyPatchThunk = createAsyncThunk(
  "workbook/doAddPortfolioTechnologyPatch",
  async ({ id, technology }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      if (!state.workbook.workbook || !state.workbook.workbook.ui) {
        throw Error("Workbook not loaded");
      }
      const data = {
        ui: {
          ...state.workbook.workbook.ui
        }
      };
      const patchResponse = await patchWorkbook(id, data);
      return patchResponse;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const doRemovePortfolioTechnologyPatchThunk = createAsyncThunk(
  "workbook/doRemovePortfolioTechnologyPatch",
  async ({ id, technology }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      console.log(state);
      if (!state.workbook.workbook || !state.workbook.workbook.ui) {
        throw Error("Workbook not loaded");
      }
      const data = {
        ui: {
          ...state.workbook.workbook.ui
        }
      };
      const patchResponse = await patchWorkbook(id, data);
      return patchResponse;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  workbook: null,
  technologies: []
};

const workbookSlice = createSlice({
  name: "workbook",
  initialState,
  extraReducers: {
    [doFetchWorkbookThunk.fulfilled]: (state, action) => {
      return {
        workbook: action.payload
      };
    },
    [doCloneAndPatchWorkbookThunk.fulfilled]: (state, action) => {
      return {
        status: "idle",
        workbook: action.payload
      };
    },
    [doEditDetailsPatchWorkbookThunk.fulfilled]: (state, action) => {
      return {
        status: "idle",
        workbook: action.payload
      };
    },
    /**
     * Optimistically update state when changing a variable value
     */
    [doUpdateWorkbookVariationVariableThunk.pending]: (state, action) => {
      state.status = "pending";
      state.currentRequestId = action.meta.requestId;
      const {
        variationIndex,
        technology,
        target,
        varpathFull,
        oldValue,
        newValue
      } = action.meta.arg;
      // objectPath works with the Immer proxy object nicely
      objectPath.set(
        state.workbook.variations[variationIndex],
        `${target}_vars.${helperStripVarpathValue(varpathFull)}`,
        newValue
      );
      return state;
    },
    [doUpdateWorkbookVariationVariableThunk.rejectedWithValue]: (
      state,
      action
    ) => {
      state.status = "rejected";
      state.currentRequestId = undefined;
      // FIXME SET ERROR STATE FOR AUTH FAILS AND DISPLAY IN UI
      const {
        variationIndex,
        technology,
        target,
        varpathFull,
        oldValue,
        newValue
      } = action.meta.arg;
      // objectPath works with the Immer proxy object nicely
      objectPath.set(
        state.workbook.variations[variationIndex],
        `${target}_vars.${helperStripVarpathValue(varpathFull)}`,
        oldValue
      );
      return state;
    },
    [doUpdateWorkbookVariationVariableThunk.rejected]: (state, action) => {
      state.status = "rejected";
      state.currentRequestId = undefined;
      // FIXME SET ERROR STATE FOR AUTH FAILS AND DISPLAY IN UI
      const {
        variationIndex,
        technology,
        target,
        varpathFull,
        oldValue,
        newValue
      } = action.meta.arg;
      // objectPath works with the Immer proxy object nicely
      objectPath.set(
        state.workbook.variations[variationIndex],
        `${target}_vars.${helperStripVarpathValue(varpathFull)}`,
        oldValue
      );
      return state;
    },
    [doUpdateWorkbookVariationVariableThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      // Check to make sure that this action was the most recent pending action.
      if (state.status === "pending" && state.currentRequestId === requestId) {
        return {
          ...state,
          status: "idle",
          currentRequestId: undefined,
          workbook: {
            ...state.workbook,
            variations: action.payload.variations
          }
        };
      }
    },
    /**
     * Optimistically update state when adding a technology.
     */
    [doAddPortfolioTechnologyPatchThunk.pending]: (state, action) => {
      state.status = "pending";
      state.currentRequestId = action.meta.requestId;
      const { technology } = action.meta.arg;
      const portfolioSolutions = helperAddPortfolioTechnology(
        state,
        technology
      );
      // TODO this may be more safely done via spreads to protect against
      // undefs. UI should be an object by default if a workbook is loaded,
      // though, and the helper checks and throws and error if it's not.
      state.workbook.ui = state.workbook.ui || {};
      state.workbook.ui.portfolioSolutions = portfolioSolutions;
      return state;
    },
    [doAddPortfolioTechnologyPatchThunk.rejectedWithValue]: (state, action) => {
      state.status = "rejected";
      state.currentRequestId = undefined;
      state.currentRequestId = action.meta.requestId;
      // TODO SET ERROR STATE FOR AUTH FAILS AND DISPLAY IN UI
      const { technology } = action.meta.arg;
      const portfolioSolutions = helperRemovePortfolioTechnology(
        state,
        technology
      );
      state.workbook.ui = state.workbook.ui || {};
      state.workbook.ui.portfolioSolutions = portfolioSolutions;
      return state;
    },
    [doAddPortfolioTechnologyPatchThunk.rejected]: (state, action) => {
      state.status = "rejected";
      state.currentRequestId = undefined;
      const { technology } = action.meta.arg;
      const portfolioSolutions = helperRemovePortfolioTechnology(
        state,
        technology
      );
      state.workbook.ui = state.workbook.ui || {};
      state.workbook.ui.portfolioSolutions = portfolioSolutions;
      return state;
    },
    [doAddPortfolioTechnologyPatchThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      // Check to make sure that this action was the most recent pending action.
      if (state.status === "pending" && state.currentRequestId === requestId) {
        return {
          ...state,
          status: "idle",
          currentRequestId: undefined,
          workbook: action.payload
        };
      }
    },
    /**
     * Optimistically update state when removing a technology.
     */
    [doRemovePortfolioTechnologyPatchThunk.pending]: (state, action) => {
      state.status = "pending";
      state.currentRequestId = action.meta.requestId;
      const { technology } = action.meta.arg;
      const portfolioSolutions = helperRemovePortfolioTechnology(
        state,
        technology
      );
      // TODO this may be more safely done via spreads to protect against
      // undefs. UI should be an object by default if a workbook is loaded,
      // though, and the helper checks and throws and error if it's not.
      state.workbook.ui = state.workbook.ui || {};
      state.workbook.ui.portfolioSolutions = portfolioSolutions;
      return state;
    },
    [doRemovePortfolioTechnologyPatchThunk.rejectedWithValue]: (
      state,
      action
    ) => {
      state.status = "rejected";
      state.currentRequestId = undefined;
      state.currentRequestId = action.meta.requestId;
      // TODO SET ERROR STATE FOR AUTH FAILS AND DISPLAY IN UI
      const { technology } = action.meta.arg;
      const portfolioSolutions = helperAddPortfolioTechnology(
        state,
        technology
      );
      state.workbook.ui = state.workbook.ui || {};
      state.workbook.ui.portfolioSolutions = portfolioSolutions;
      return state;
    },
    [doRemovePortfolioTechnologyPatchThunk.rejected]: (state, action) => {
      state.status = "rejected";
      state.currentRequestId = undefined;
      const { technology } = action.meta.arg;
      const portfolioSolutions = helperAddPortfolioTechnology(
        state,
        technology
      );
      state.workbook.ui = state.workbook.ui || {};
      state.workbook.ui.portfolioSolutions = portfolioSolutions;
      return state;
    },
    [doRemovePortfolioTechnologyPatchThunk.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      // Check to make sure that this action was the most recent pending action.
      if (state.status === "pending" && state.currentRequestId === requestId) {
        return {
          ...state,
          status: "idle",
          currentRequestId: undefined,
          workbook: action.payload
        };
      } else {
        return state;
      }
    }
  },
  reducers: {
    setVariableValue(state, action) {
      const { varpath, target = "scenario", value, variationIndex = 0 } = action.payload;
      const variationVarpath = `${target}_vars.${helperStripVarpathValue(varpath)}`;
      objectPath.set(state.workbook.variations[variationIndex], variationVarpath, value);
    },
    workbookLoading(state) {
      return {
        ...state,
        status: "loading"
      };
    },
    workbookLoaded(state, action) {
      return {
        ...state,
        workbook: action.payload,
        status: "idle"
      };
    },
    unsetWorkbook() {
      return {
        workbook: {},
        status: "idle"
      };
    },
    variationUpdated(state, action) {
      return {
        ...state,
        workbook: {
          ...state.workbook,
          has_run: false,
          variation: action.payload
        },
        status: "idle"
      };
    },
    calculationLoading(state) {
      return {
        ...state,
        status: "loading",
        calculationLoading: true
      };
    },
    calculationLoaded(state, action) {
      return {
        ...state,
        workbook: {
          ...state.workbook,
          has_run: true
        },
        projection: action.payload.projection,
        techData: {...state.techData, ...action.payload.techData},
        summaryData: action.payload.summaryData,
        status: "idle",
        calculationLoading: false
      };
    },
    calculationFail(state, action) {
      return {
        ...state,
        workbook: {
          ...state.workbook,
          error: action.payload
        }
      };
    }
  }
});

// grey line - TAM projection (

export const {
  setVariableValue,
  unsetWorkbook,
  workbookLoading,
  workbookLoaded,
  variationUpdated,
  calculationLoading,
  calculationLoaded,
  calculationFail
} = workbookSlice.actions;

export default workbookSlice.reducer;

// Thunk function
export const fetchWorkbookThunk = id => async dispatch => {
  dispatch(workbookLoading());
  const workbook = await fetchWorkbook(id);
  const scenario = await fetchData(workbook.variations[0].scenario_parent_path);
  const reference = await fetchData(
    workbook.variations[0].reference_parent_path
  );
  const obj = {
    ...workbook,
    scenario,
    reference
  };
  dispatch(workbookLoaded(obj));
};

export const setVariationThunk = (opts, variation) => async dispatch => {
  const res = await updateVariation(opts, variation);
  dispatch(variationUpdated(res));
};

// Clone workbook
export const cloneWorkbookThunk = id => async dispatch => {
  dispatch(workbookLoading());
  const response = await cloneWorkbook(id);
  dispatch(workbookLoaded(response));
};

// Patch workbook
export const patchWorkbookThunk = (id, data) => async dispatch => {
  dispatch(workbookLoading());
  const response = await patchWorkbook(id, data);
  dispatch(workbookLoaded(response));
};

// Clone and patch in one (don't want to trigger the workbookLoaded dispatch
// unil both are done).
export const clonepatchWorkbookThunk = (id, data) => async dispatch => {
  dispatch(workbookLoading());
  const cloneResponse = await cloneWorkbook(id);
  const patchResponse = await patchWorkbook(cloneResponse.id, data);
  dispatch(workbookLoaded(patchResponse));
};

export const unsetWorkbookThunk = () => async dispatch => {
  dispatch(unsetWorkbook());
};

export const calculateThunk = (
  id,
  variationIndex,
  activeTechnology
) => async (dispatch, getState) => {
  dispatch(calculationLoading());
  try {
    const state = getState();
    const res = await runCalculation(id, variationIndex);

    if (res.detail) return dispatch(errorAdded(res));
    const techValue = res.results.filter(p => p.technology === activeTechnology)[0];

    let techData = {};
    if (techValue.hash !== objectPath.get(state, "workbook.techData.hash")) {
      techData = await fetchData(techValue.path);
      techData = {...techData, hash: techValue.hash};
    }

    const reference = await fetchResources(id, 'reference');
    const vma = await fetchResources(id, 'vma');

    const summaryData = await fetchData(res.meta.summary_path);

    dispatch(
      calculationLoaded({
        projection: res,
        references: reference,
        vmas: vma,
        techData,
        summaryData
      })
    );
  } catch (e) {
    dispatch(calculationFail(e));
  }
};
