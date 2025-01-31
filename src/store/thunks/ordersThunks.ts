import {createAsyncThunk} from "@reduxjs/toolkit";
import {DishOrder, OrderType} from "../../types";
import axiosApi from "../../axiosAPI.tsx";
import {RootState} from "../../app/store.ts";

export const createOrders = createAsyncThunk<void, OrderType>('orders/createDishes', async (orders) => {
    await axiosApi.post("orders.json", orders);
});

export const fetchOrders = createAsyncThunk<DishOrder[], void, { state: RootState }>(
    'dishes/fetchOrders', async (_arg, thunkAPI) => {
        const response: { data: { [key: string]: OrderType } } = await axiosApi.get(`orders.json`);
        const orderList = response.data;

        if (!orderList) {
            return [];
        }

        const state = thunkAPI.getState().dishes.dishes;

        const orders: DishOrder[] = [];

        Object.keys(orderList).map((outId) => {
            const innerId: OrderType = orderList[outId];
            Object.keys(innerId).map((secondId) => {
                const count = innerId[secondId];
                const dish = state.find((item) => item.id === secondId);
                if (dish) {
                    orders.push({
                        order: dish,
                        count: Number(count),
                        mainId: outId,
                    });
                }
            });
        });
        return orders;
    }
);


export const deleteOrders = createAsyncThunk<void, string>('orders/deleteOrders', async (id: string) => {
    await axiosApi.delete(`orders/${id}.json`);
});
