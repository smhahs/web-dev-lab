import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import langReducer from './slices/langSlice';
import productReducer from './slices/productSlice'; // <--- Import

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    cart: cartReducer,
    lang: langReducer,
    products: productReducer, // <--- Add
  },
});