import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllDishes} from "../../store/slices/dishesSlice.ts";
import {useEffect} from "react";
import {getDishes} from "../../store/thunks/dishesThunks.ts";
import {Box, Button, Typography} from "@mui/material";
import {addOrder, openModal, totalOrder} from "../../store/slices/ordersSlice.ts";
import {DishesMutation} from "../../types";
import Modal from "../../components/UI/Modal/Modal.tsx";


const ClientPage = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(getAllDishes);
    const totalOrders = useAppSelector(totalOrder);

    const addDish = (dish: DishesMutation) => {
        dispatch(addOrder({order: dish, count: 1}));
    };

    const totalPrice = totalOrders.reduce((acc, dish) => {
        acc += dish.order.price * dish.count;
        return acc;
    },0);

    const isOpenModal = () => {
        dispatch(openModal());
    };

    useEffect(() => {
        dispatch(getDishes());
    }, [dispatch]);

    return (
        <>
            <Modal />
            {dishes.map((dishItem) => (
                <Box key={dishItem.id} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    margin: 'auto',
                    border: "1px solid #eee",
                    width: 600,
                    marginBottom: 2,
                }}
                     onClick={() => addDish(dishItem)}
                >
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={dishItem.image} alt={dishItem.title}
                             style={{width: 100, height: 100, marginRight: 20}}/>
                        <Typography>{dishItem.title}</Typography>
                    </div>
                    <div>
                        <Typography sx={{marginRight: 5}}>{dishItem.price} KGS</Typography>
                    </div>
                </Box>
            ))}
            <Box sx={{display: "flex", alignItems: "center", width: 400, margin: '40px auto 0'}}>
                <Typography sx={{marginRight: 5}}>Total Order: {totalPrice} KGS </Typography>
                <Button variant='contained' onClick={() => isOpenModal()}>Checkout</Button>
            </Box>
        </>
    );
};

export default ClientPage;