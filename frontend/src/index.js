import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// reducer settings
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// redux persist configs to save states in the browser
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// redux persist settings
const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = persistReducer(
  persistConfig,
  authReducer,
  
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider> component makes the redux store available to any nested components that need to access the Redux store */}
    <Provider store={store}>
      {/* PersistGate delays the rendering of the app UI 'till persisted state has been retrieved and saved to redux */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
      {/* end */}
    </Provider>
    {/* end */}
  </React.StrictMode>
);
