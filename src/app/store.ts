import {configureStore} from "@reduxjs/toolkit";
import {dishesSlice} from "../store/slices/dishesSlice.ts";

export const store = configureStore({
    reducer: {
        dishes: dishesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;