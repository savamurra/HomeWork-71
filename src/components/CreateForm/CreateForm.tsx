import {useCallback, useState} from "react";
import {DishesForm} from "../../types";
import {Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch} from "../../app/hooks.ts";
import {createDishes} from "../../store/thunks/dishesThunks.ts";

const initialState = {
    title: '',
    price: 0,
    image: '',
};
const CreateForm = () => {
    const [form, setForm] = useState<DishesForm>(initialState);
    const dispatch = useAppDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const createDish = useCallback(async (dish: DishesForm) => {
        dispatch(createDishes(dish));
    },[dispatch]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.title.trim().length !== 0 && form.image.trim().length !== 0) {
            await createDish(form);
        }
        setForm(initialState);
    };


    return (
        <form onSubmit={onSubmit}>
            <Typography variant="h4" sx={{flexGrow: 1, textAlign: "center"}}>
                Form
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
                            inputProps : {
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
                        color="info"
                        type="submit"
                        variant="contained"
                        sx={{ width: "100%" }}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CreateForm;