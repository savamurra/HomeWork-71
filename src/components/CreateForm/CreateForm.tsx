import React, {useCallback, useEffect, useState} from "react";
import {DishesForm} from "../../types";
import {Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {createDishes, editDishes} from "../../store/thunks/dishesThunks.ts";
import {RootState} from "../../app/store.ts";
import {editLoading, loading, resetSelectedDishes} from "../../store/slices/dishesSlice.ts";
import {toast} from "react-toastify";


const initialState = {
    title: '',
    price: 0,
    image: '',
};
const CreateForm = () => {
    const [form, setForm] = useState<DishesForm>(initialState);
    const dispatch = useAppDispatch();
    const selectedDishes = useAppSelector((state: RootState) => state.dishes.selectedDishes);
    const isEdit = useAppSelector(editLoading);
    const isCreate = useAppSelector(loading);

    useEffect(() => {
        if (selectedDishes) {
            setForm(selectedDishes);
        } else {
            setForm(initialState);
        }
        return () => {
            dispatch(resetSelectedDishes());
        };
    }, [dispatch, selectedDishes]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const createDish = useCallback(async (dish: DishesForm) => {
        dispatch(createDishes(dish));
    }, [dispatch]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedDishes) {
            await dispatch(editDishes({...selectedDishes, ...form}));
            toast.success('Edit dish success!');
        } else {
            if (form.title.trim().length !== 0 && form.image.trim().length !== 0) {
                await createDish(form);
                toast.success('Create dish success!');
            }
        }
        setForm(initialState);
    };


    return (
        <form onSubmit={onSubmit}>
            <Typography variant="h4" sx={{flexGrow: 1, textAlign: "center"}}>
                {selectedDishes ? 'Edit Dishes' : "Create Dishes"}
            </Typography>
            <Grid
                container
                spacing={2}
                sx={{mx: "auto", width: "50%", mt: 4, justifyContent: "center"}}
            >
                <Grid size={8}>
                    <TextField
                        sx={{width: "100%"}}
                        id="outlined-basic"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid size={8}>
                    <TextField
                        sx={{width: "100%"}}
                        id="outlined-basic"
                        label="Price"
                        name="price"
                        value={form.price}
                        onChange={onChange}
                        variant="outlined"
                        type="number"
                        required
                        InputProps={{
                            inputProps: {
                                min: 0,
                            }
                        }}
                    />
                </Grid>
                <Grid size={8}>
                    <TextField
                        sx={{width: "100%"}}
                        id="outlined-basic"
                        label="Image"
                        name="image"
                        value={form.image}
                        onChange={onChange}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid size={8}>
                    <Button
                        disabled={isEdit || isCreate}
                        color="info"
                        type="submit"
                        variant="contained"
                        sx={{width: "100%"}}
                    >
                        {selectedDishes ? 'edit' : "create"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CreateForm;