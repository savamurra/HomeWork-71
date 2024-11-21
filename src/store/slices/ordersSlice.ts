import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DishOrder} from "../../types";
import {RootState} from "../../app/store.ts";

interface OrderState {
    orderDishes: DishOrder[];
    isOpenModal: boolean;
    deliver: number;
}

const initialState: OrderState = {
    orderDishes: [],
    isOpenModal: false,
    deliver: 150
};

export const totalOrder = ((state: RootState) => state.orders.orderDishes);
export const openModals = (state: RootState) => state.orders.isOpenModal;
export const deliverCost = ((state: RootState) => state.orders.deliver);

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
    }
});

export const { addOrder, openModal, closeModal, deleteOrder } = ordersSlice.actions;