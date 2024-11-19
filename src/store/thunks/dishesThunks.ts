import {createAsyncThunk} from "@reduxjs/toolkit";
import {DishesForm} from "../../types";
import axiosApi from "../../axiosAPI.tsx";

export const createDishes = createAsyncThunk<void, DishesForm>('dishes/createDishes', async (dishes: DishesForm) => {
   await axiosApi.post("dishes.json", {...dishes});
});