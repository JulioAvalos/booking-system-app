import {Button, Container, Grid, Typography} from "@mui/material";
import {useContext, useEffect} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {map} from 'lodash';
import BookingList from "../../components/BookingList";
import {bookingList} from "../../utils/sampleData";

export default function MainPage() {

    const navigate = useNavigate();
    const {verifyLogin} = useContext(AuthContext);

    useEffect(() => {
        const result = verifyLogin();
        if (!result) {
            navigate('/login');
        }
    }, []);

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
                    {map(bookingList, ({dayMonth, startTime, endTime, roomName, status}, index) => {
                        return (
                            <BookingList
                                key={`booking-list-${index}`}
                                dayMonth={dayMonth}
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
