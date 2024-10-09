import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../models/Category.model";
import axios, { AxiosError } from "axios"; 
import { AppDispatch } from "../store";






interface CategoriesState {
    list: Category[],
    status: "initial" | "loading" | "idle"
}

const initialState: CategoriesState = {
    list: [],
    status: "initial"
} 

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategoriesState(state, action: PayloadAction<CategoriesState>) {
            state.list = action.payload.list;
            state.status = action.payload.status;
        }
    },
});

export const { setCategoriesState } = categorySlice.actions;

export const loadCategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setCategoriesState({
            list: [],
            status: "loading"
        }));

        const res = await axios.get<any>(
            "http://localhost:5056/api/categories"
        );
        const categoriesResponse: Category[] = res.data;

        dispatch(setCategoriesState({
            list: categoriesResponse,
            status: "idle"
        }));

    } catch (error) {
        if (error instanceof AxiosError) console.error(error.message);
        else console.error;
    }
};
 

export default categorySlice.reducer;