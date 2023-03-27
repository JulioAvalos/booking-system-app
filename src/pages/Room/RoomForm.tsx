import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {
    Autocomplete,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {FaArrowLeft} from "react-icons/fa";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {levelList, statusList} from "../../utils/sampleData";
import {Level} from "../../interfaces";
import {createRoom, getRoomById, updateRoom} from "../../api/services/room";

const RoomFormSchemaValidation = Yup.object().shape({
    name: Yup.string().required('Ingrese el nombre'),
    capacity: Yup.number().min(1, 'La capacidad minima es de 1').required('Ingrese la capacidad de la sala'),
    status: Yup.object({
        id: Yup.number(),
        name: Yup.string(),
        value: Yup.string()
    }).required('Ingrese el estado de la sala'),
    level: Yup.object({
        id: Yup.number(),
        name: Yup.string(),
        buildingId: Yup.number(),
        createdAt: Yup.string().nullable(),
        createdBy: Yup.string().nullable(),
        updatedAt: Yup.string().nullable(),
        updatedBy: Yup.string().nullable(),
    }).required('Ingrese a que nivel pertenece al sala'),
    photoUrl: Yup.string()
});

const initialValues = {
    name: '',
    capacity: 1,
    status: {"id": 1, "name": "Activo", "value": "active"},
    level: {} as Level,
    photoUrl: ''
}

export default function RoomForm() {

    const {id} = useParams();
    const navigate = useNavigate();
    const {verifyLogin, displayModal, user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [roomDetail, setRoomDetail] = useState(initialValues);

    useEffect(() => {
        const result = verifyLogin();
        if (!result) {
            navigate('/login');
        } else if (result && result.role !== 'ADMIN') {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (id) {
            getRoomById(Number(id)).then((resp) => {

                const detail = {
                    ...resp.data.data.items
                }

                setRoomDetail(resp.data.data.items);
            }).catch((err) => {
                displayModal('Error: no se pudo obtener informacion de la sala');
            });
        }
    }, [id]);

    const handleSubmit = (values: any) => {
        setLoading(true);
        console.log('submit', values);
        console.log(JSON.stringify(values));

        const formData = {
            name: values.name,
            levelId: values.level.id,
            capacity: values.capacity,
            status: values.status.value,
            photoUrl: values.photoUrl,
            createdBy: user.username
        }

        if (id) {
            updateRoom(Number(id), formData).then((resp) => {
                setLoading(false);
                displayModal('Se ha actualizado la sala');
            }).catch((err) => {
                setLoading(false);
                displayModal('Error: no se pudo actualizar la sala');
            })
        } else {
            createRoom(formData).then((resp) => {
                setLoading(false);
                displayModal('Se ha creado la sala');
                navigate('/room');
            }).catch((err) => {
                setLoading(false);
                displayModal('Error: no se pudo crear la sala');
            });
        }
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
                        to="/room"
                    >
                        <FaArrowLeft color="#01426A"/>
                    </IconButton>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="h4" sx={{fontWeight: 500, color: "#01426A"}}>
                        {id ? 'Actualizar Sala' : 'Crear Sala'}
                    </Typography>
                </Grid>
            </Grid>
            <Formik
                initialValues={{
                    name: roomDetail.name || '',
                    capacity: roomDetail.capacity || 1,
                    status: roomDetail.status || '',
                    level: roomDetail.level || '',
                    photoUrl: roomDetail.photoUrl || ''
                }}
                enableReinitialize
                validationSchema={RoomFormSchemaValidation}
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
                    console.log(values);
                    console.log(errors);
                    return (
                        <Form>
                            <Grid container spacing={2} sx={{mt: 2}}>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        label="Nombre de la sala"
                                        id="name"
                                        name="name"
                                        variant="outlined"
                                        value={values.name}
                                        error={errors.name && touched.name}
                                        helperText={
                                            errors.name && touched.name
                                                ? errors.name : ''
                                        }
                                        onChange={(event: any) => {
                                            setFieldValue('name', event.target.value)
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        label="Capacidad"
                                        id="capacity"
                                        name="capacity"
                                        variant="outlined"
                                        type="number"
                                        value={values.capacity}
                                        inputProps={{
                                            min: 0,
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*'
                                        }}
                                        error={errors.capacity && touched.capacity}
                                        helperText={
                                            errors.capacity && touched.capacity
                                                ? errors.capacity : ''
                                        }
                                        onChange={(event: any) => {
                                            setFieldValue('capacity', event.target.value)
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        options={levelList}
                                        onChange={(event, value) => {
                                            setFieldValue('level', value);
                                        }}
                                        value={values.level}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => option.name || ''}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Nivel"
                                                    id="level"
                                                    name="level"
                                                    variant="outlined"
                                                    error={Boolean(errors.level && touched.level)}
                                                    helperText={
                                                        errors.level as string && touched.level as string
                                                            ? errors.level as string : ''
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        options={statusList}
                                        onChange={(event, value) => {
                                            setFieldValue('status', value);
                                        }}
                                        value={values.status}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => option.name || ''}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Estado"
                                                    id="status"
                                                    name="status"
                                                    variant="outlined"
                                                    error={Boolean(errors.status && touched.status)}
                                                    helperText={
                                                        errors.status as string && touched.status as string
                                                            ? errors.status as string : ''
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        label="Foto de sala (Opcional)"
                                        id="photoUrl"
                                        name="photoUrl"
                                        variant="outlined"
                                        value={values.photoUrl}
                                        error={errors.photoUrl && touched.photoUrl}
                                        helperText={
                                            errors.photoUrl && touched.photoUrl
                                                ? errors.photoUrl : ''
                                        }
                                        onChange={(event: any) => {
                                            setFieldValue('photoUrl', event.target.value)
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        component={TextField}
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
                                        {id ? 'Actualizar' : 'Crear'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </Container>
    );
}
