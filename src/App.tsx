import './App.css';
import CreateForm from "./components/CreateForm/CreateForm.tsx";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import {Container} from "@mui/material";
import ClientPage from "./containers/ClientPage/ClientPage.tsx";
import Dishes from "./containers/Dishes/Dishes.tsx";
import Orders from "./containers/Orders/Orders.tsx";
import Home from "./containers/Home/Home.tsx";

function App() {

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <Container>
                <Routes>
                    <Route path='admin/dishes/form' element={<CreateForm/>}/>
                    <Route path='/admin' element={<Home/>}/>
                    <Route path='admin/dishes' element={<Dishes/>}/>
                    <Route path='admin/orders' element={<Orders/>}/>
                    <Route path='/' element={<ClientPage/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
