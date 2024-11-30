import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../LocalStorage/LocalStorage";

const initialState = {
    openSidebar: getLocalStorage('openSidebar'),
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.openSidebar = !state.openSidebar; 
    },
    openSidebar: (state) => {
      state.openSidebar = true;
    },
    closeSidebar: (state) => {
      state.openSidebar = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
