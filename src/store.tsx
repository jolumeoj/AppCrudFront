import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import selectedReducer from './slices/selectedSlice';
import lstSelectedReducer from './slices/lstSelectedSlice';
export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        selected: selectedReducer,
        lstSelected: lstSelectedReducer
    },
});

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;