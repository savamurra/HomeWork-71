import {createAsyncThunk} from "@reduxjs/toolkit";
import {DishesForm, DishesList, DishesMutation} from "../../types";
import axiosApi from "../../axiosAPI.tsx";

export const createDishes = createAsyncThunk<void, DishesForm>('dishes/createDishes', async (dishes: DishesForm) => {
    await axiosApi.post("dishes.json", {...dishes});
});

export const getDishes = createAsyncThunk<DishesMutation[], void>(
    "contact/getContact", async () => {
        const response: { data: DishesList | null } = await axiosApi.get("dishes.json");
        const dishesList = response.data;


        if (dishesList === null) {
            return [];
        }

        const dishes: DishesList = dishesList;
        return Object.keys(dishesList).map((item) => {
            return {
                ...dishes[item],
                id: item,
            };
        });
    },
);

export const editDishes = createAsyncThunk<void, DishesMutation>('dishes/editDishes', async (dishes) => {
    const {id, ...data} = dishes;
    await axiosApi.put(`dishes/${id}.json`, data);
});

export const deleteDishes = createAsyncThunk<void, string>('dishes/deleteDishes', async (id: string) => {
    await axiosApi.delete(`dishes/${id}.json`);
});
