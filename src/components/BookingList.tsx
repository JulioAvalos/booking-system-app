import {Box, Button, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {FaRegCheckCircle} from "react-icons/fa";
import {IoMdCloseCircleOutline} from "react-icons/io";
import {ImClock} from "react-icons/im";
import {
    parseDateTimeToStringTime,
    parseDateToString,
} from "../utils/util";
import {cancelBooking} from "../api/services/booking";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";

interface IBookingListProps {
    id: number;
    dayMonth: string;
    startTime: string;
    endTime: string;
    roomName: string;
    status: string;
}

export default function BookingList({id, dayMonth, startTime, endTime, roomName, status}: IBookingListProps) {

    const {displayModal} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const handleCancelBooking = async (id: number) => {
        setLoading(true);
        const resp = await cancelBooking(id);
        setLoading(false);
        displayModal('Se ha cancelado la reserva');
    }

    return (
        <Card
            elevation={5}
            sx={{mt: 3}}
        >
            <CardContent>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '3em'
                    }}
                >
                    {(status && status === 'APPROVED') && (<FaRegCheckCircle color="#65D498" size={30}/>)}
                    {(status && (status === 'REJECTED' || status === 'CANCELED')) && (
                        <IoMdCloseCircleOutline color="#DF1C24" size={35}/>)}
                    {(status && status === 'PENDING') && (<ImClock color="#BABCBE" size={30}/>)}

                    {/*PENDING*/}

                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {dayMonth ? parseDateToString(dayMonth) : ''}
                    </Typography>
                    <Box>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            {startTime ? parseDateTimeToStringTime(startTime) : ''}
                        </Typography>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Entrada
                        </Typography>
                    </Box>
                    <div style={{borderTop: '1px solid black', width: '50px'}}></div>
                    <Box>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            {endTime ? parseDateTimeToStringTime(endTime) : ''}
                        </Typography>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Salida
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Sala
                        </Typography>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            {roomName}
                        </Typography>
                    </Box>
                    {(status && status === 'PENDING') && (<Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{fontWeight: 700}}
                            onClick={() => {
                                handleCancelBooking(id);
                            }}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress color="primary" size={15}/> : ''}
                        >
                            Cancelar
                        </Button>
                    </Box>)}

                </Box>
            </CardContent>
        </Card>
    );
}
