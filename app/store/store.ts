import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import themeReducer from "./slices/themeSlice"; // Import the themeReducer

const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer, // Ensure themeReducer is correctly added
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
