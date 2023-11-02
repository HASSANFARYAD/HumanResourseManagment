import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "../redux/adminSlice";

const allReducers = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export const persistor = persistStore(store);
