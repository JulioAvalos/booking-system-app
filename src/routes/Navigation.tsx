import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Login from "../pages/Login";
import Booking from "../pages/Booking";
import {Box} from "@mui/material";

function Navigator() {
    return (
        <Router>
            <Navbar/>
            <Box sx={{height: '85vh'}}>
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route path="booking" element={<Booking/>}/>
                    <Route path='/*' element={<Navigate to='/login' replace/>}/>
                </Routes>
            </Box>
            <Footer/>
        </Router>
    );
}

export default Navigator;
