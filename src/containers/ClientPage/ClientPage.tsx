import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllDishes, loading} from "../../store/slices/dishesSlice.ts";
import {useEffect} from "react";
import {getDishes} from "../../store/thunks/dishesThunks.ts";
import {Box, Button, Typography} from "@mui/material";
import {addOrder, openModal, totalOrder} from "../../store/slices/ordersSlice.ts";
import {DishesMutation} from "../../types";
import Modal from "../../components/UI/Modal/Modal.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {toast} from "react-toastify";


const ClientPage = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(getAllDishes);
    const totalOrders = useAppSelector(totalOrder);
    const getLoading = useAppSelector(loading);

    const addDish = (dish: DishesMutation) => {
        dispatch(addOrder({order: dish, count: 1}));
    };

    const totalPrice = totalOrders.reduce((acc, dish) => {
        acc += dish.order.price * dish.count;
        return acc;
    }, 0);

    const isOpenModal = () => {
        if (totalOrders.length > 0) {
            dispatch(openModal());
        } else {
            toast.error('Выберите блюда для того что бы заказать!');
        }
    };

    useEffect(() => {
        dispatch(getDishes());
    }, [dispatch]);

    return (
        <>
            {getLoading ? <Spinner/> : (
                <>
                    <Modal/>
                    {dishes.length === 0 && <Typography variant='h5' align='center'>No Dishes</Typography>}
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
            )}
        </>
    );
};

export default ClientPage;