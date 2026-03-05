import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./baseApi/baseApi";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import dashboardReducer from "./features/dashboard/dashboardSlice";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
