import {configureStore} from "@reduxjs/toolkit";
import {dishesSlice} from "../store/slices/dishesSlice.ts";
import {ordersSlice} from "../store/slices/ordersSlice.ts";

export const store = configureStore({
    reducer: {
        dishes: dishesSlice.reducer,
        orders: ordersSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;