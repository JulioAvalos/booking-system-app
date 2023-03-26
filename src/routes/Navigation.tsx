import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import {Box} from "@mui/material";
import BookingRoom from "../pages/BookingRoom";
import Index from "../pages/Room";

function Navigator() {
    return (
        <Router>
            <Navbar/>
            <Box>
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route path="booking" element={<MainPage/>}/>
                    <Route path="booking/room" element={<BookingRoom/>}/>
                    <Route path="room" element={<Index/>}/>
                    <Route path='/*' element={<Navigate to='/login' replace/>}/>
                </Routes>
            </Box>
        </Router>
    );
}

export default Navigator;
