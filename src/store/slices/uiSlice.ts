import { UIstate } from "@/types/slice.types";
import { ThemeMode } from "@/types/util.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UIstate = {
  mode:
    ((typeof window !== "undefined" &&
      localStorage.getItem("theme")) as ThemeMode) || "light",
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, toggleSidebar, setSidebarOpen } =
  uiSlice.actions;
export default uiSlice.reducer;
