import {Box, Card, CardContent, Typography} from "@mui/material";
import {FaRegCheckCircle} from "react-icons/fa";
import {IoMdCloseCircleOutline} from "react-icons/io";

interface IBookingListProps {
    dayMonth: string;
    startTime: string;
    endTime: string;
    roomName: string;
    status: string;
}

export default function BookingList({dayMonth, startTime, endTime, roomName, status}: IBookingListProps) {

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
                    {(status && status === 'active') && (<FaRegCheckCircle color="#65D498" size={30}/>)}
                    {(status && status === 'inactive') && (<IoMdCloseCircleOutline color="#DF1C24" size={35}/>)}
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {dayMonth}
                    </Typography>
                    <Box>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            {startTime}
                        </Typography>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Entrada
                        </Typography>
                    </Box>
                    <div style={{borderTop: '1px solid black', width: '50px'}}></div>
                    <Box>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            {endTime}
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
                </Box>
            </CardContent>
        </Card>
    );
}
