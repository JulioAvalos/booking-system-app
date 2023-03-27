import {
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
    Autocomplete,
    CircularProgress
} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {TimePicker} from "@mui/x-date-pickers";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {levelList, roomList} from "../../utils/sampleData";
import {createBooking} from "../../api/services/booking";

const BookingSchemaValidation = Yup.object().shape({
    bookingDate: Yup.date().required('Ingrese la fecha'),
    startTime: Yup.string().required('Ingrese la hora'),
    endTime: Yup.string().required('Ingrese la hora'),
    reason: Yup.string().required('Ingrese el motivo'),
    level: Yup.object({
        id: Yup.number(),
        name: Yup.string(),
        buildingId: Yup.number(),
        createdAt: Yup.string().nullable(),
        createdBy: Yup.string().nullable(),
        updatedAt: Yup.string().nullable(),
        updatedBy: Yup.string().nullable(),
    }).required('Ingrese a que nivel pertenece al sala'),
    room: Yup.object({
        id: Yup.number(),
        name: Yup.string(),
        level: Yup.string(),
        capacity: Yup.number(),
        photoUrl: Yup.string(),
        status: Yup.string()
    }).required('Ingrese una sala')
});

export default function BookingRoom() {

    const navigate = useNavigate();
    const {verifyLogin, displayModal} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const result = verifyLogin();
        if (!result) {
            navigate('/login');
        }
    }, []);

    const lookUpRoomsByLevel = (level: any) => {
        
    }

    const handleSubmit = (values: any) => {
        setLoading(true);
        const {room, level, bookingDate, ...rest} = values;

        const formData = {
            ...rest,
            reservationDate: values.bookingDate,
            roomId: values.room.id,
            userId: 1,
            attendees: 1,
            recurring: false,
            status: 'PENDING'
        }

        

        createBooking(formData).then(() => {
            setLoading(false);
            displayModal('Se ha creado la reserva de sala');
            navigate('/booking');
        }).catch(err => {
            setLoading(false);
            displayModal('Error: no se pudo hacer la reserva');
        });

    }

    return (
        <Container sx={{mt: 5}} maxWidth="md">
            <Grid container spacing={1}>
                <Grid
                    item
                    xs={1}
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <IconButton
                        component={RouterLink}
                        to="/booking"
                    >
                        <FaArrowLeft color="#01426A"/>
                    </IconButton>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="h4" sx={{fontWeight: 500, color: "#01426A"}}>
                        Reserva de Sala
                    </Typography>
                </Grid>
            </Grid>
            <Formik
                initialValues={{
                    bookingDate: '',
                    startTime: '',
                    endTime: '',
                    reason: '',
                    room: null,
                }}
                enableReinitialize
                validationSchema={BookingSchemaValidation}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(false);
                    handleSubmit(values);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue
                  }) => {
                    

                    return (
                        <Form>
                            <Grid container sx={{mt: 2}} spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        ¿Cuando la necesitas reservar?
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <DatePicker
                                        onChange={(value) => setFieldValue('bookingDate', value)}
                                        value={values.bookingDate}
                                        minDate={new Date()}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    error={Boolean(errors.bookingDate && touched.bookingDate)}
                                                    helperText={
                                                        errors.bookingDate && touched.bookingDate
                                                            ? errors.bookingDate : ''
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    name="bookingDate"
                                                    label="Fecha Reservacion"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TimePicker
                                        value={values.startTime}
                                        onChange={(event) => {
                                            setFieldValue('startTime', event)
                                        }}
                                        ampm
                                        ampmInClock
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Hora Inicio"
                                                    id="startTime"
                                                    type="time"
                                                    name="startTime"
                                                    variant="outlined"
                                                    error={Boolean(errors.startTime && touched.startTime)}
                                                    helperText={
                                                        errors.startTime && touched.startTime
                                                            ? errors.startTime : ''
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            );
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={4}>
                                    <TimePicker
                                        value={values.endTime}
                                        onChange={(event) => {
                                            setFieldValue('endTime', event)
                                        }}
                                        ampm
                                        ampmInClock
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Hora Fin"
                                                    id="endTime"
                                                    type="time"
                                                    name="endTime"
                                                    variant="outlined"
                                                    error={Boolean(errors.endTime && touched.endTime)}
                                                    helperText={
                                                        errors.endTime && touched.endTime
                                                            ? errors.endTime : ''
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        label="Motivo de reserva"
                                        id="reason"
                                        name="reason"
                                        variant="outlined"
                                        error={errors.reason && touched.reason}
                                        helperText={
                                            errors.reason && touched.reason
                                                ? errors.reason : ''
                                        }
                                        onChange={(event: any) => {
                                            setFieldValue('reason', event.target.value)
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        options={levelList}
                                        onChange={(event, value) => {
                                            setFieldValue('level', value);
                                            lookUpRoomsByLevel(value);
                                        }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Nivel"
                                                    id="level"
                                                    name="level"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        options={roomList}
                                        onChange={(event, value) => setFieldValue('room', value)}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Lista de salas"
                                                    id="room"
                                                    name="room"
                                                    variant="outlined"
                                                    error={Boolean(errors.room && touched.room)}
                                                    helperText={
                                                        errors.room && touched.room
                                                            ? errors.room : ''
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        sx={{fontWeight: 600}}
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress color="primary" size={15}/> : ''}
                                    >
                                        Reservar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
                }
            </Formik>

        </Container>
    );
}
