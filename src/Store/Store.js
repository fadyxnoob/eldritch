import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./AdminSlice"
import sidebarReducer from './DashboardSlices/Sidebar'

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer, 
        sidebar : sidebarReducer, 
    },
});

export default store;
