import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios"; 
import { AppDispatch } from "../store";



interface SelectedState {
    list: any[],
    status: "initial" | "loading" | "idle"
}

const initialState: SelectedState = {
    list: [],
    status: "initial"
} 

const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        setSelectedState(state, action: PayloadAction<SelectedState>) {
            state.list = action.payload.list;
            state.status = action.payload.status;
        }
    },
});

export const { setSelectedState } = selectedSlice.actions;


export const addSelected = (idProduct: number, userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setSelectedState({
            list: [],
            status: "loading"
        }));

        // Crear el objeto que se enviará en el cuerpo de la solicitud
        const data = { UserId: userId };

        const res = await axios.post<any>(
            `http://localhost:5056/api/${idProduct}/wishes`,
            data
        );

        const selectedResponse: any[] = res.data;

        dispatch(setSelectedState({
            list: selectedResponse,
            status: "idle"
        }));

    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
};
export const deleteSelected = (id:any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setSelectedState({
            list: [],
            status: "loading"
        }));

        const res = await axios.delete<any>(
            `http://localhost:5056/api/${id}/wishes`
        );
        const selectedResponse: any[] = res.data;

        dispatch(setSelectedState({
            list: selectedResponse,
            status: "idle"
        }));

    } catch (error) {
        if (error instanceof AxiosError) console.error(error.message);
        else console.error;
    }
};
 

export default selectedSlice.reducer;