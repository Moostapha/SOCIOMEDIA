import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// our reducers
import authReducer from "./state";
//import userAlertReducer from "state/userAlertReducer";
// reducer settings
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Cause we're using 2 reducers, one persisting and the other no
//import { combineReducers } from "@reduxjs/toolkit";
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
const persistConfig = {
  key: "root",
  blacklist: ["userAlertReducer"], // userAlertReducer will not be persisted
  storage,
  version: 1,
};

// const reducers = combineReducers({
//   authReducer,
//   userAlertReducer,
// });

// const persistedReducer = persistReducer( persistConfig, reducers);

const persistedReducer = persistReducer( persistConfig, authReducer );

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
