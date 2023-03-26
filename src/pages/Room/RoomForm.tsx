import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Autocomplete, Button, Container, Grid, IconButton, TextField, Typography} from "@mui/material";
import {FaArrowLeft} from "react-icons/fa";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";

const statusList = [
    {
        id: 1,
        name: 'Activo',
        value: 'active'
    },
    {
        id: 2,
        name: 'Inactivo',
        value: 'inactive'
    },
    {
        id: 3,
        name: 'Ocupado',
        value: 'busy'
    },
]

const levelList = [
    {
        id: 1,
        name: "Nivel 1",
        buildingId: 1,
        createdAt: "2023-03-24T07:40:32.761Z",
        createdBy: "admin",
        updatedAt: null,
        updatedBy: null
    },
    {
        id: 2,
        name: "Nivel 2",
        buildingId: 1,
        createdAt: "2023-03-24T07:40:32.761Z",
        createdBy: "admin",
        updatedAt: null,
        updatedBy: null
    }
]

const RoomFormSchemaValidation = Yup.object().shape({
    name: Yup.string().required('Ingrese el nombre'),
    capacity: Yup.number().min(1, 'La capacidad minima es de 1').required('Ingrese la capacidad de la sala'),
    status: Yup.string().required('Ingrese el estado de la sala'),
    level: Yup.object().required('Ingrese a que nivel pertenece al sala'),
    photoUrl: Yup.string()
});

export default function RoomForm() {

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        console.log('id', id);
    }, []);

    const handleSubmit = (values: any) => {
        console.log('submit', values);
        if (id) {
            //todo: update
        } else {
            //todo: create
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
                    name: '',
                    capacity: 1,
                    status: 'active',
                    levelId: null,
                    photoUrl: ''
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
                                <Grid item xs={6}>
                                    <Autocomplete
                                        options={statusList}
                                        onChange={(event, value) => {
                                            setFieldValue('status', value);
                                        }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Estado"
                                                    id="status"
                                                    name="status"
                                                    variant="outlined"
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
                                        label="Foto de sala"
                                        id="photoUrl"
                                        name="photoUrl"
                                        variant="outlined"
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
