import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Box} from "@mui/material";
import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";
import MainPage from "../pages/Main/MainPage";
import BookingRoom from "../pages/Booking/BookingRoom";
import RoomPage from "../pages/Room/RoomPage";
import RoomForm from "../pages/Room/RoomForm";

function Navigator() {
    return (
        <Router>
            <Navbar/>
            <Box>
                <Routes>
                    {/*public routes*/}
                    <Route path="login" element={<Login/>}/>
                    {/*authenticated routes*/}
                    <Route path="booking" element={<MainPage/>}/>
                    <Route path="booking/room" element={<BookingRoom/>}/>
                    {/*admin routes*/}
                    <Route path="room" element={<RoomPage/>}/>
                    <Route path="room/create" element={<RoomForm/>}/>
                    <Route path="room/:id" element={<RoomForm/>}/>
                    {/*redirect*/}
                    <Route path='/*' element={<Navigate to='/login' replace/>}/>
                </Routes>
            </Box>
        </Router>
    );
}

export default Navigator;
