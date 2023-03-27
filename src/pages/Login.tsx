import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import Sun from '../assets/images/sun.png';
import LoginImage from '../assets/images/login-image.png';
import {AuthContext} from "../context/AuthContext";

const LoginSchemaValidation = Yup.object().shape({
    username: Yup.string().required('Ingrese su Cusca ID'),
    password: Yup.string().required('Ingrese su contraseña'),
});

function Login() {

    const navigate = useNavigate();
    const {login, displayModal, verifyLogin} = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        const isLogged = verifyLogin();
        if (isLogged) {
            navigate('/booking');
        }
    }, []);

    const handleSubmitLogin = async (values: any) => {
        const response = await login(values.username, values.password);
        if (response) {
            navigate('/booking');
        } else {
            displayModal('Credenciales incorrectas!');
        }
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={6}>
                    <Box sx={{
                        height: '80vh',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            enableReinitialize
                            validationSchema={LoginSchemaValidation}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(false);
                                handleSubmitLogin(values);
                            }}
                        >
                            {({
                                  errors,
                                  touched,
                                  setFieldValue
                              }) => {
                                return (
                                    <Form>
                                        <Container maxWidth="lg">
                                            <Grid container spacing={2} justifyContent="center">
                                                <Grid item xs={12} container justifyContent="center">
                                                    <Typography variant="h4" sx={{mr: 2, fontWeight: 700}}>
                                                        Buenas tardes
                                                    </Typography>
                                                    <img src={Sun} alt='sun icon'/>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Field
                                                        fullWidth
                                                        id="username"
                                                        name="username"
                                                        label="Cusca ID"
                                                        variant="outlined"
                                                        component={TextField}
                                                        onChange={(event: any) => {
                                                            setFieldValue('username', event.target.value);
                                                        }}
                                                        error={errors.username && touched.username}
                                                        helperText={
                                                            errors.username && touched.username ? errors.username : ''
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={12}></Grid>
                                                <Grid item xs={8}>
                                                    <Field
                                                        fullWidth
                                                        id="password"
                                                        name="password"
                                                        label="Contraseña"
                                                        variant="outlined"
                                                        type={showPassword ? 'text' : 'password'}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        onClick={handleClickShowPassword}
                                                                        edge="end"
                                                                    >
                                                                        {
                                                                            showPassword ?
                                                                                <AiOutlineEye
                                                                                    color="#01426A"
                                                                                    size={20}/>
                                                                                :
                                                                                <AiOutlineEyeInvisible
                                                                                    color="#01426A"
                                                                                    size={20}/>
                                                                        }
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        error={errors.password && touched.password}
                                                        helperText={
                                                            errors.password && touched.password ? errors.password : ''
                                                        }
                                                        component={TextField}
                                                        onChange={(event: any) => {
                                                            setFieldValue('password', event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}></Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        fullWidth
                                                        type="submit"
                                                        variant="contained"
                                                        color="secondary"
                                                        sx={{fontWeight: 600}}
                                                    >
                                                        Ingresar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </Form>
                                )
                            }}
                        </Formik>

                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{
                        height: '80vh',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img src={LoginImage} alt="login image"/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
