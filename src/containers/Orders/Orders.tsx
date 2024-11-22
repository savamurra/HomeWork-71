import {Box, Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deliverCost, getAllOrders, isDelete, isLoading} from "../../store/slices/ordersSlice.ts";
import {useCallback, useEffect} from "react";
import {deleteOrders, fetchOrders} from "../../store/thunks/ordersThunks.ts";
import {getDishes} from "../../store/thunks/dishesThunks.ts";
import {DishOrder} from "../../types";
import {toast} from "react-toastify";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";


const Orders = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(getAllOrders);
    const deliver = useAppSelector(deliverCost);
    const isDeleteLoading = useAppSelector(isDelete);
    const loading = useAppSelector(isLoading);

    const groupedOrders = orders.reduce((acc, order) => {
        const {mainId} = order;

        if (!mainId) {
            return acc;
        }

        if (!acc[mainId]) {
            acc[mainId] = {mainId, items: [], total: 0};
        }

        acc[mainId].items.push(order);
        acc[mainId].total += order.order.price * order.count;

        return acc;
    }, {} as { [key: string]: { mainId: string; items: DishOrder[]; total: number } });

    const onDelete = useCallback(async (id: string) => {
        await dispatch(deleteOrders(id));
        await dispatch(fetchOrders());
        toast.success('Order completed successfully');
    }, [dispatch]);


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getDishes());
            await dispatch(fetchOrders());
        };
        void fetchData();
    }, [dispatch]);

    return (
        <>
            {loading ? <Spinner/> : (
                <>
                    {orders.length === 0 && <Typography variant='h5' align='center'>No orders yet</Typography>}
                    {Object.values(groupedOrders).map((dish) => (
                            <Box sx={{
                                width: "100%",
                                maxWidth: 600,
                                margin: "auto",
                                mt: 4,
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: 2,
                                p: 2,
                                backgroundColor: "white",
                            }}
                                 key={dish.mainId}
                            >
                                <Typography variant="h6" align="center" gutterBottom>
                                    🛒 Orders
                                </Typography>
                                {dish.items.map((item) => (
                                    <div key={item.order.id}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "column"
                                        }}
                                        >
                                            <div style={{display: "flex", justifyContent: "space-around"}}>
                                                <Typography>x{item.count} {item.order.title}</Typography>
                                                <Typography>{item.order.price} KGS</Typography>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div
                                    style={{display: "flex", justifyContent: "space-around"}}>
                                    <div>
                                        <Typography>Delivery {deliver} KGS</Typography>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <Typography sx={{marginRight: 2}}>Order Total</Typography>
                                        <Typography><strong>{dish.total + deliver} KGS</strong></Typography>
                                    </div>
                                </div>
                                <Button sx={{width: '100%'}} onClick={() => onDelete(dish.mainId)}
                                        disabled={isDeleteLoading}>Complete Order</Button>
                            </Box>
                        )
                    )}
                </>
            )}
        </>
    )
        ;
};

export default Orders;