import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./AdminSlice"
import sidebarReducer from './DashboardSlices/Sidebar'
import cartReducer from './cartSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        sidebar: sidebarReducer,
        cart: cartReducer,
    },
});

export default store;
