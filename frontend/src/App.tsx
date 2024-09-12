import React from 'react';
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Box from "@mui/material/Box";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="classic" element={<Classic />} />
            </Routes>
        </BrowserRouter>
    );
}



