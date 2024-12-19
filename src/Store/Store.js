import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./AdminSlice"
import sidebarReducer from './DashboardSlices/Sidebar'
import cartReducer from './cartSlice'
import orderReducer from "./orderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        sidebar: sidebarReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

export default store;
