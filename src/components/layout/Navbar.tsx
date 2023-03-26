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
    IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, SwipeableDrawer,
    Toolbar,
    Typography
} from "@mui/material";
import LogoBank from "../../assets/images/logo-bank.png";
import {FaBook, FaDoorOpen} from "react-icons/fa";
import {FiMenu} from "react-icons/fi";
import {AuthContext} from "../../context/AuthContext";
import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BsPersonBadge, GrSchedules, GrClose} from "react-icons/all";

export default function Navbar() {

    const navigate = useNavigate();

    const {user, isLoggedIn, logout} = useContext(AuthContext);

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);

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
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <IconButton
                                    size="large"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={() => setOpen(true)}
                                    color="inherit"
                                >
                                    <FiMenu size={30}/>
                                </IconButton>
                                <SwipeableDrawer
                                    disableBackdropTransition={!iOS}
                                    disableDiscovery={iOS}
                                    anchor={'left'}
                                    open={open}
                                    onOpen={() => setOpen(true)}
                                    onClose={() => setOpen(false)}
                                >
                                    <Grid sx={{margin: '1em'}} container justifyContent="center" alignItems="center">
                                        <Grid item xs={2}>
                                            <IconButton
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => setOpen(false)}
                                                color="primary"
                                            >
                                                <GrClose color='#185A7D'/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={10} container justifyContent="center" alignItems="center">
                                            <Typography
                                                variant="h6"
                                                noWrap
                                                sx={{
                                                    color: '#185A7D'
                                                }}
                                            >
                                                Menu
                                            </Typography>
                                        </Grid>
                                        {isLoggedIn && (
                                            <List>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <FaBook size={25} color="#000"/>
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        <Link to={"/booking"}>
                                                            <MenuItem onClick={() => setOpen(false)}>
                                                                <Typography textAlign="center" sx={{color: '#185A7D'}}>Inicio</Typography>
                                                            </MenuItem>
                                                        </Link>
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <BsPersonBadge size={25} color="#000"/>
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        <Link to={"/room"}>
                                                            <MenuItem onClick={() => setOpen(false)}>
                                                                <Typography textAlign="center" sx={{color: '#185A7D'}}>Salas</Typography>
                                                            </MenuItem>
                                                        </Link>
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        )}
                                    </Grid>
                                </SwipeableDrawer>
                            </Grid>
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
                    backdropFilter: "blur(6px)"
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
