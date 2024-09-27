import React from 'react';
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Ability from "./pages/Ability";
import Box from "@mui/material/Box";
import {styled} from "@mui/system";


const AppContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#1a1a1a', // Dark background color
    minHeight: '100vh', // Ensure it covers the full height of the page
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
}));

export default function App() {
    return (
        <AppContainer>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="classic" element={<Classic />} />
                    <Route path="ability" element={<Ability/>} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </AppContainer>
    );
}



