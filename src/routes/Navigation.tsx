import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import {Box} from "@mui/material";
import BookingRoom from "../pages/BookingRoom";
import RoomPage from "../pages/Room/RoomPage";
import RoomForm from "../pages/Room/RoomForm";

function Navigator() {
    return (
        <Router>
            <Navbar/>
            <Box>
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route path="booking" element={<MainPage/>}/>
                    <Route path="booking/room" element={<BookingRoom/>}/>
                    <Route path="room" element={<RoomPage/>}/>
                    <Route path="room/create" element={<RoomForm/>}/>
                    <Route path="room/:id" element={<RoomForm/>}/>
                    <Route path='/*' element={<Navigate to='/login' replace/>}/>
                </Routes>
            </Box>
        </Router>
    );
}

export default Navigator;
