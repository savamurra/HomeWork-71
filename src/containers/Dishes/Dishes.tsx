import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteDishes, getDishes} from "../../store/thunks/dishesThunks.ts";
import {useCallback, useEffect} from "react";
import {deleteLoading, getAllDishes, getDishesData, loading} from "../../store/slices/dishesSlice.ts";
import {Box, Button, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {toast} from "react-toastify";

const Dishes = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(getAllDishes);
    const idDelete = useAppSelector(deleteLoading);
    const getLoading = useAppSelector(loading);

    const onDelete = useCallback(async (id: string) => {
        await dispatch(deleteDishes(id));
        await dispatch(getDishes());
        toast.success('Dish deleted successfully');
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDishes());
    }, [dispatch]);

    return (
        <>
            {getLoading ? <Spinner/> : (
                <>
                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: 'space-between',
                        borderBottom: '2px solid DodgerBlue',
                        marginBottom: 2
                    }}>
                        <Typography variant='h5'>Dishes</Typography>
                        <Button to="form" component={NavLink}>Add new dish</Button>
                    </Box>
                    {dishes.length === 0 && <Typography variant='h5' align='center'>No Dishes</Typography>}
                    {dishes.map((dishItem) => (
                        <Box key={dishItem.id} sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'space-between',
                            margin: 'auto',
                            border: "3px solid DodgerBlue",
                            borderRadius: 4,
                            width: 1000,
                            padding: 1,
                            marginBottom: 2,
                        }}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <img src={dishItem.image} alt={dishItem.title}
                                     style={{width: 180, marginRight: 20}}/>
                                <Typography>{dishItem.title}</Typography>
                            </div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{marginRight: 5}}>{dishItem.price} KGS</Typography>
                                <Button to='form' component={NavLink}
                                        onClick={() => dispatch(getDishesData(dishItem))}>Edit</Button>
                                <Button onClick={() => onDelete(dishItem.id)} disabled={idDelete}>Delete</Button>
                            </div>
                        </Box>
                    ))}
                </>
            )}
        </>
    );
};

export default Dishes;