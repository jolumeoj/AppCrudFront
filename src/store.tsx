import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer
    },
});

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;