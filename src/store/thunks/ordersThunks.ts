import {createAsyncThunk} from "@reduxjs/toolkit";
import { OrderType} from "../../types";
import axiosApi from "../../axiosAPI.tsx";

export const createOrders = createAsyncThunk<void, OrderType>('dishes/createDishes', async (orders) => {
    await axiosApi.post("orders.json", orders);
});
