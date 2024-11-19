import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <Box sx={{flexGrow: 1, mb: 4}}>
                <AppBar position="static">
                    <Toolbar sx={{width: 1200, mx: "auto"}}>
                        <Typography
                            variant="h6"
                            component={NavLink}
                            to="admin"
                            sx={{flexGrow: 1, textDecoration: "none", color: "white"}}
                        >
                            {location.pathname.startsWith('/admin') ? 'Turtle Pizza Admin' : 'Turtle Pizza '}
                        </Typography>
                        {location.pathname.startsWith("/admin") && (
                            <>
                                <Button color="inherit" to="admin/dishes" component={NavLink}>
                                    Dishes
                                </Button>
                                <Button color="inherit" to="admin/order" component={NavLink}>
                                    Order
                                </Button>
                            </>
                        )
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Navbar;
