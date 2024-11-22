import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline/>
            <ToastContainer />
            <App />
        </BrowserRouter>
    </Provider>
);
