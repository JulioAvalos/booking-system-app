import {Box, Button, Card, CardContent, Container, Grid, Typography} from "@mui/material";
import {FaRegCheckCircle} from "react-icons/fa";
import {IoMdCloseCircleOutline} from "react-icons/io";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Loading} from "../components/layout/Loading";

export default function Booking() {

    const navigate = useNavigate();
    const {verifyLogin} = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const result = verifyLogin();
        setTimeout(() => {
            if (!result) {
                navigate('/login');
            }
            setLoading(false);
        }, 2000);

    }, []);

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
                                <FaRegCheckCircle color="#65D498" size={30}/>
                                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                    4 / Mayo
                                </Typography>
                                <Box>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                        8:30am
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                        Entrada
                                    </Typography>
                                </Box>
                                <div style={{borderTop: '1px solid black', width: '50px'}}></div>
                                <Box>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                        8:30am
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
                                        Tunco
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
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
                                <IoMdCloseCircleOutline color="#DF1C24" size={35}/>
                                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                    12 / Ene
                                </Typography>
                                <Box>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                        8:30am
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                        Entrada
                                    </Typography>
                                </Box>
                                <div style={{borderTop: '1px solid black', width: '50px'}}></div>
                                <Box>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                        8:30am
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
                                        Tunco
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
