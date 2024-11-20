import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DishesMutation} from "../../types";
import {RootState} from "../../app/store.ts";
import {deleteDishes, editDishes, getDishes} from "../thunks/dishesThunks.ts";

interface DishesSliceState {
    dishes: DishesMutation[]
    selectedDishes: DishesMutation | null
    isLoading: boolean
}

const initialState: DishesSliceState = {
    dishes: [],
    selectedDishes: null,
    isLoading: false,
};

export const getAllDishes = (state: RootState) => state.dishes.dishes;
export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        getDishesData: (state, action: PayloadAction<DishesMutation>) => {
            state.selectedDishes = action.payload;
        },
        resetSelectedDishes: (state) => {
            state.selectedDishes = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDishes.fulfilled, (state, action: PayloadAction<DishesMutation[]>) => {
                state.dishes = action.payload;
                state.isLoading = false;
            })
            .addCase(getDishes.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(editDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editDishes.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editDishes.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDishes.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteDishes.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const {getDishesData, resetSelectedDishes} = dishesSlice.actions;