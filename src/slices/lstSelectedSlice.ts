import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios"; 
import { AppDispatch } from "../store";



interface LstselectedState {
    list: any[],
    status: "initial" | "loading" | "idle"
}

const initialState: LstselectedState = {
    list: [],
    status: "initial"
} 

const lstSelectedSlice = createSlice({
    name: 'lstselected',
    initialState,
    reducers: {
        setLstselectedState(state, action: PayloadAction<LstselectedState>) {
            state.list = action.payload.list;
            state.status = action.payload.status;
        }
    },
});

export const { setLstselectedState } = lstSelectedSlice.actions;

export const loadSelected = (id:any

) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLstselectedState({
            list: [],
            status: "loading"
        }));

        const res = await axios.get<any>(
            `http://localhost:5056/api/${id}/wishes`
        );
        const selectedResponse: any[] = res.data;

        dispatch(setLstselectedState({
            list: selectedResponse,
            status: "idle"
        }));

    } catch (error) {
        if (error instanceof AxiosError) console.error(error.message);
        else console.error;
    }
};

export const deleteSelected = (id:any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLstselectedState({
            list: [],
            status: "loading"
        }));

        const res = await axios.delete<any>(
            `http://localhost:5056/api/${id}/wishes`
        );
        const selectedResponse: any[] = res.data;

        dispatch(setLstselectedState({
            list: selectedResponse,
            status: "idle"
        }));

    } catch (error) {
        if (error instanceof AxiosError) console.error(error.message);
        else console.error;
    }
};
 

export default lstSelectedSlice.reducer;