import { createSlice } from "@reduxjs/toolkit";

// Define the shape of the state
interface ThemeState {
  theme: "light" | "dark"; // Restrict to "light" or "dark" using a union type
}

// Define the initial state
const initialState: ThemeState = { theme: "light" };

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // Toggle between "light" and "dark"
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

// Export the action and reducer
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
