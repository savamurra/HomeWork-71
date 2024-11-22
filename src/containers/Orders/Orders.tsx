import {Box, Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllOrders} from "../../store/slices/ordersSlice.ts";
import {useEffect} from "react";
import {fetchOrders} from "../../store/thunks/ordersThunks.ts";
import {getDishes} from "../../store/thunks/dishesThunks.ts";


const Orders = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(getAllOrders);

    const totalSum = orders.reduce((acc, order) => {
        acc += order.order.price * order.count;
        return acc;
    },0);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getDishes());
            await dispatch(fetchOrders());
        };
        void fetchData();
    }, [dispatch]);

    return (
        <div>
            <Box sx={{
                width: "100%",
                maxWidth: 600,
                margin: "auto",
                mt: 4,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                p: 2,
                backgroundColor: "white",
            }}>
                <Typography variant="h6" align="center" gutterBottom>
                    🛒 Orders
                </Typography>
                {orders.map((dish) => (
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}
                    key={dish.order.id + crypto.randomUUID()}
                    >
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Typography>x{dish.count} {dish.order.title}</Typography>
                            <Typography>{dish.order.price}</Typography>
                        </div>
                    </div>
                ))}
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                    <Typography>Order Total</Typography>
                    <Typography><strong>{totalSum}</strong></Typography>
                    <Button>Complete Order</Button>
                </div>
            </Box>
        </div>
    );
};

export default Orders;