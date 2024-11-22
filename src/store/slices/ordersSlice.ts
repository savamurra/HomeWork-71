import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { DishOrder,} from "../../types";
import {RootState} from "../../app/store.ts";
import {createOrders, deleteOrders, fetchOrders} from "../thunks/ordersThunks.ts";

interface OrderState {
    orderDishes: DishOrder[];
    finalOrder: DishOrder[];
    isOpenModal: boolean;
    deliver: number;
    isLoading: boolean;
    isDeleteLoading: boolean;
}

const initialState: OrderState = {
    orderDishes: [],
    finalOrder: [],
    isOpenModal: false,
    deliver: 150,
    isLoading: false,
    isDeleteLoading: false,
};

export const totalOrder = ((state: RootState) => state.orders.orderDishes);
export const openModals = (state: RootState) => state.orders.isOpenModal;
export const deliverCost = ((state: RootState) => state.orders.deliver);
export const getAllOrders = ((state: RootState) => state.orders.finalOrder);
export const isLoading = ((state: RootState) => state.orders.isLoading);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<DishOrder>) => {
            const currentOrder = state.orderDishes.find(dish => dish.order.id === action.payload.order.id);
            if (currentOrder) {
                currentOrder.count += action.payload.count;
            } else {
                state.orderDishes.push(action.payload);
            }
        },
        openModal: (state) => {
            state.isOpenModal = true;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
            state.orderDishes = [];
        },
        deleteOrder: (state, action: PayloadAction<DishOrder>) => {
            const currentOrder = state.orderDishes.find(dish => dish.order.id === action.payload.order.id);
            if (currentOrder) {
                currentOrder.count -= action.payload.count;
                if (currentOrder.count <= 0) {
                    state.orderDishes = state.orderDishes.filter(dish => dish.order.id !== action.payload.order.id);
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrders.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createOrders.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<DishOrder[]>) => {
                state.finalOrder = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteOrders.pending, (state) => {
                state.isDeleteLoading = true;
            })
            .addCase(deleteOrders.fulfilled, (state) => {
                state.isDeleteLoading = false;
            })
            .addCase(deleteOrders.rejected, (state) => {
                state.isDeleteLoading = false;
            });
    }
});

export const {addOrder, openModal, closeModal, deleteOrder} = ordersSlice.actions;