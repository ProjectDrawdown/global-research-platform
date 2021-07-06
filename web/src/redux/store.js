import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import workbooksReducers from "./reducers/workbook/workbookListSlice";
import workbookReducers from "./reducers/workbook/workbookSlice";
import workbookUIReducers from "./reducers/workbook/workbookUISlice";
import resourcesReducers from "./reducers/resourcesSlice.js";
import vmaMappingsReducers from "./reducers/vmaMappingsSlice.js";
import vmaCalculationsReducers from "./reducers/vmaCalculationsSlice.js";
import errorReducer from "./reducers/util/errorSlice";
import filterQueryReducer from "./reducers/filterQuery/filterQuerySlice";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    workbooks: workbooksReducers,
    workbook: workbookReducers,
    workbookUI: workbookUIReducers,
    vmaMappings: vmaMappingsReducers,
    vmaCalculations: vmaCalculationsReducers,
    resources: resourcesReducers,
    error: errorReducer,
    filterQuery: filterQueryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export default store;
