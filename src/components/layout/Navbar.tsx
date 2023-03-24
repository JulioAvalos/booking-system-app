import {
    AppBar,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import LogoBank from "../../assets/images/logo-bank.png";
import {FaDoorOpen} from "react-icons/all";
import {AuthContext} from "../../context/AuthContext";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const {user, isLoggedIn, logout} = useContext(AuthContext);

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const clearStorage = () => {
        setOpenDialog(false);
        logout();
        navigate('/login');
    }

    const getInitialFromName = (firstName: string, lastName: string) => {
        return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    }

    return (
        <>
            <Box sx={{flexGrow: 1, mb: 2}}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container spacing={1}>
                            <Grid item>
                                <img src={LogoBank}/>
                            </Grid>
                            <Grid item>
                                <Divider orientation="vertical" color="white"/>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" noWrap sx={{ml: 1}}>
                                    Sistema de Reserva
                                </Typography>
                            </Grid>
                        </Grid>
                        {isLoggedIn && (
                            <Grid
                                container
                                alignItems="center"
                                justifyContent='flex-end'
                                spacing={2}
                            >
                                <Grid item xs={11} container alignItems="center" justifyContent='flex-end' spacing={2}>
                                    <Grid item>
                                        <Avatar sx={{bgcolor: `${user ? user.color : '#000'}`}}>
                                            {user && user.firstName && user.lastName ? getInitialFromName(user.firstName, user.lastName) : 'N/A'}
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" sx={{fontWeight: 500}}>
                                            {user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : ''}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton onClick={() => setOpenDialog(true)}>
                                        <FaDoorOpen size={25} color="white"/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
                sx={{
                    backdropFilter: "blur(10px)"
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    Cerrando sesion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Deseas salir de la sesion?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} autoFocus variant="contained" color="secondary"
                            sx={{fontWeight: 700}}>
                        Cancelar
                    </Button>
                    <Button onClick={clearStorage} variant="contained" color="secondary" sx={{fontWeight: 700}}>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
