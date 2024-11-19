import {createSlice} from "@reduxjs/toolkit";
import {DishesMutation} from "../../types";

interface DishesSliceState {
    dishes: DishesMutation[]
    isLoading: boolean
}

const initialState: DishesSliceState = {
    dishes: [],
    isLoading: false,
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {}
});