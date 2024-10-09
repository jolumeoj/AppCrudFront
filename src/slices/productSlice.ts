import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../models/Product.model";
import axios, { AxiosError } from "axios"; 
import { AppDispatch } from "../store";






interface ProductsState {
    list: Product[],
    status: "initial" | "loading" | "idle"
}

const initialState: ProductsState = {
    list: [],
    status: "initial"
} 

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsState(state, action: PayloadAction<ProductsState>) {
            state.list = action.payload.list;
            state.status = action.payload.status;
        }
    },
});

export const { setProductsState } = productSlice.actions;

export const loadProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setProductsState({
            list: [],
            status: "loading"
        }));

        const res = await axios.get<any>(
            "http://localhost:5056/api/products"
        );
        const productsResponse: Product[] = res.data;

        dispatch(setProductsState({
            list: productsResponse,
            status: "idle"
        }));

    } catch (error) {
        if (error instanceof AxiosError) console.error(error.message);
        else console.error;
    }
};
 

export default productSlice.reducer;