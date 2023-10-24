import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const allReducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: [] will use if want to persist specific reducer
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export const persistor = persistStore(store);
