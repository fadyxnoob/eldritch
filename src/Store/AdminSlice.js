import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: JSON.parse(localStorage.getItem("adminLogin")) || false,
    adminData: JSON.parse(localStorage.getItem("adminData")) || null,  
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginAdmin: (state, action) => {
            if (!action.payload || !action.payload.adminData) {
                console.error("Invalid admin payload detected");
                return;
            }

            state.status = true;
            state.adminData = action.payload.adminData;

            // Save to localStorage when logged in
            localStorage.setItem("adminData", JSON.stringify(action.payload.adminData));
        },
        logoutAdmin: (state) => {
            state.status = false;
            state.adminData = null;

            // Remove from localStorage when logged out
            localStorage.removeItem("adminData");
        },
    },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
