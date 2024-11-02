import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userdata: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        login: (state, action) => {
            console.log('Login user Data ::', action.payload.userdata);
        
            if (!action.payload || !action.payload.userdata) {
                console.error("Invalid payload detected");
                return state; 
            }
        
            state.status = true;
            state.userdata = action.payload.userdata; 
        },

        logout: (state) => {
            state.status = false;
            state.userdata = null;
        },
    },
});

export const { login: authLogin, logout } = authSlice.actions;
export default authSlice.reducer;