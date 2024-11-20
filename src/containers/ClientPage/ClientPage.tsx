import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllDishes} from "../../store/slices/dishesSlice.ts";
import {useEffect} from "react";
import {getDishes} from "../../store/thunks/dishesThunks.ts";
import {Box, Typography} from "@mui/material";


const ClientPage = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(getAllDishes);

    useEffect(() => {
        dispatch(getDishes());
    }, [dispatch]);

    return (
        <>{dishes?.map((dishItem) => (
                <Box key={dishItem.id} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    margin: 'auto',
                    border: "1px solid #eee",
                    width: 600,
                    marginBottom: 2,
                }}>
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
        </>
    );
};

export default ClientPage;