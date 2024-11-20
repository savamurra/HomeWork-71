import './App.css';
import CreateForm from "./components/CreateForm/CreateForm.tsx";
import Home from "./containers/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import {Container} from "@mui/material";
import ClientPage from "./containers/ClientPage/ClientPage.tsx";

function App() {

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <Container>
                <Routes>
                    <Route path='admin/form' element={<CreateForm/>}/>
                    <Route path='admin' element={<Home/>}/>
                    <Route path='/' element={<ClientPage/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
