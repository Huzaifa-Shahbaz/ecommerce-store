import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import favReducer from './slices/favSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import adminAuthReducer from "./slices/adminAuthSlice";



const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        auth: authReducer,
        users: userReducer,
        cart: cartReducer,
        fav: favReducer,
    },
})

export default store;