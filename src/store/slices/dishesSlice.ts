import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DishesMutation} from "../../types";
import {RootState} from "../../app/store.ts";
import {createDishes, deleteDishes, editDishes, getDishes} from "../thunks/dishesThunks.ts";

interface DishesSliceState {
    dishes: DishesMutation[];
    selectedDishes: DishesMutation | null;
    isLoading: boolean;
    isEditLoading: boolean;
    isDeleteLoading: boolean;
}

const initialState: DishesSliceState = {
    dishes: [],
    selectedDishes: null,
    isLoading: false,
    isEditLoading: false,
    isDeleteLoading: false,
};

export const getAllDishes = (state: RootState) => state.dishes.dishes;
export const editLoading = (state: RootState) => state.dishes.isEditLoading;
export const deleteLoading = (state: RootState) => state.dishes.isDeleteLoading;
export const loading = (state: RootState) => state.dishes.isLoading;


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
            .addCase(createDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDishes.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createDishes.rejected, (state) => {
                state.isLoading = false;
            })
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
                state.isEditLoading = true;
            })
            .addCase(editDishes.fulfilled, (state) => {
                state.isEditLoading = false;
            })
            .addCase(editDishes.rejected, (state) => {
                state.isEditLoading = false;
            })
            .addCase(deleteDishes.pending, (state) => {
                state.isDeleteLoading = true;
            })
            .addCase(deleteDishes.fulfilled, (state) => {
                state.isDeleteLoading = false;
            })
            .addCase(deleteDishes.rejected, (state) => {
                state.isDeleteLoading = false;
            });
    }
});

export const {getDishesData, resetSelectedDishes} = dishesSlice.actions;