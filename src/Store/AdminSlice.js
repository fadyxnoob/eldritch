import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    adminData: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginAdmin: (state, action) => {
            console.log("Admin data:", action.payload);
            if (!action.payload || !action.payload.adminData) {
                console.error("Invalid admin payload detected");
                return;
            }
            state.status = true;
            state.adminData = action.payload.adminData;
        },
        logoutAdmin: (state) => {
            state.status = false;
            state.adminData = null;
        },
    },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
