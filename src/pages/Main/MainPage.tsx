import {Button, Container, Grid, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {map} from 'lodash';
import BookingList from "../../components/BookingList";
import {bookingList} from "../../utils/sampleData";
import {bookingHistory} from "../../api/services/booking";
import {Loading} from "../../components/layout/Loading";

export default function MainPage() {

    const navigate = useNavigate();
    const {verifyLogin, user} = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [reservationList, setReservationList] = useState([]);

    useEffect(() => {
        const result = verifyLogin();
        if (!result) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (user) {
            getBookingHistory();
        }
    }, [user]);

    const getBookingHistory = async () => {
        const resp = await bookingHistory(user.id);
        setReservationList(resp.data.data.items);
        setLoading(false);
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <Container>
            <Grid container>
                <Grid item container spacing={1} xs={6}>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{mt: 5}}>
                            🌞 Buenas tardes, <b>Juan</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{color: '#AAAAAA', fontWeight: 'normal'}}>
                            ¿Buscando un poco de silencio y aire acondicionado?
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            component={RouterLink}
                            to="/booking/room"
                            sx={{fontWeight: 700}}
                            fullWidth
                        >
                            Reservar sala
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container sx={{mt: 4}}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Historial
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {map(reservationList, ({reservationDate, startTime, endTime, roomName, status}, index) => {
                        return (
                            <BookingList
                                key={`booking-list-${index}`}
                                dayMonth={reservationDate}
                                startTime={startTime}
                                endTime={endTime}
                                roomName={roomName}
                                status={status}
                            />
                        )
                    })}
                </Grid>
            </Grid>
        </Container>
    )
}
