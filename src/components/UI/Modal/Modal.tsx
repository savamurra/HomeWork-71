import {Button, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    closeModal,
    deleteOrder,
    deliverCost,
    openModals,
    totalOrder
} from "../../../store/slices/ordersSlice.ts";
import {useCallback} from "react";
import {DishesMutation, OrderType} from "../../../types";
import {createOrders} from "../../../store/thunks/ordersThunks.ts";

const Modal = () => {
    const isOpenModal = useAppSelector(openModals);
    const totalOrders = useAppSelector(totalOrder);
    const deliver = useAppSelector(deliverCost);
    const dispatch = useAppDispatch();
    const totalPrice = totalOrders.reduce((acc, dish) => {
        acc += dish.order.price * dish.count;
        return acc;
    },0);

    const createOrder = useCallback(async () => {
        const formatedOrder = totalOrders.reduce((acc: OrderType, dish) => {
            acc[dish.order.id] = dish.count;
            return acc;
        }, {});

        await dispatch(createOrders(formatedOrder));
        dispatch(closeModal());
    },[dispatch, totalOrders]);

    const deleteDish = (dish: DishesMutation) => {
        dispatch(deleteOrder({order: dish, count: 1}));
    };

    if (!isOpenModal) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 8,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    width: 400,
                }}
            >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: 20,
                            alignItems: "center",
                            justifyItems: "center",
                        }}
                    >
                        <div style={{width: "100%"}}>
                            <Typography variant='h5'>
                                Your Order
                            </Typography>
                            <div style={{marginBottom: 20}}>
                                {totalOrders.map((order) => (
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}} key={order.order.id}>
                                        <Typography>{order.order.title}</Typography>
                                        <Typography>x {order.count}</Typography>
                                        <Typography>x {order.order.price}</Typography>
                                            <Button
                                                style={{width: 50}}
                                                onClick={() => deleteDish(order.order)}
                                            >
                                                <DeleteIcon/>
                                            </Button>
                                    </div>
                                ))}
                            </div>
                            <Typography sx={{display: 'flex', justifyContent: 'space-between'}}>Delivery: <span>{deliver} KGS</span></Typography>
                            <Typography sx={{display: 'flex', justifyContent: 'space-between'}}>Total: <span>{totalPrice + deliver} KGS</span></Typography>
                        </div>
                        <Button sx={{width: '100%'}} onClick={() => dispatch(closeModal())}>
                            Cancel
                        </Button>
                        <Button sx={{width: '100%'}}
                        onClick={() => createOrder()}
                        >
                            Order
                        </Button>
                    </div>
            </div>
        </div>
    );
};

export default Modal;