import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { OutlinedInput } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    margin: {
        margin: theme.spacing(0),
        width: '100%',
    },
}));

export default function SignIn() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: '',
        name: '',
        password: '',
        password2: '',
        errorName: false,
        errorEmail: false,
        errorPassword: false,
        showPassword: false,
        titleEror: false,
        logged: false,
    });


    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    function validateEmail(email) {
        var r = /^\w+@\w+\.\w{2,4}$/i;
        return r.test(String(email).toLowerCase());
    }

    const { enqueueSnackbar } = useSnackbar();

    let history = useHistory();


    const signUp = () => {
        let error = false;

        if (values.name.length < 3) {
            enqueueSnackbar("Имя должно быть длинее 3 символов!", {
                variant: 'error',
            });
            setValues({ ...values, errorName: true });
            error = true;
        } else {
            setValues({ ...values, errorName: false });
        }
        if (!validateEmail(values.email)) {
            console.log("Incorrect email!");
            enqueueSnackbar("Проверьте правильность вашей почты", {
                variant: 'error',
            });
            setValues({ ...values, errorEmail: true });
            error = true;
        } else {
            setValues({ ...values, errorEmail: false });
        }
        if (values.password.length < 5) {
            console.log("Password should be more the 5 simbols!");
            enqueueSnackbar("Пароль должен быть длинее 5 символов!", {
                variant: 'error',
            });
            setValues({ ...values, errorPassword: true });
            error = true;
        } else {
            setValues({ ...values, errorPassword: false });
        }
        if (values.password !== values.password2) {
            console.log("Passwords should be equal!");
            enqueueSnackbar("Пароли не совпадают", {
                variant: 'error',
            });
            setValues({ ...values, errorPassword: true });
            error = true;
        } else {
            setValues({ ...values, errorPassword: false });
        }

        // console.dir(values);

        if (error) {
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "email": values.email, "name": values.name, "password": values.password });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/signup/owner", requestOptions)
            .then(response => {
                if (response.status === 409) {
                    enqueueSnackbar("Данная почта уже зарегистрирована", {
                        variant: 'warning',
                    });
                    setValues({ ...values, errorEmail: true });
                    return;
                }
                return response.json();
            })
            .then(result => {
                if (result.owner === null) {
                    // enqueueSnackbar("Данная почта уже зарегистрирована", {
                    //     variant: 'warning',
                    // });
                    // setValues({ ...values, errorEmail: true });
                } else {
                    console.dir(result);
                    enqueueSnackbar("Регистрация успешно завершена", {
                        variant: 'success'
                    });
                    setValues({...values, logged: true });
                    history.push('/');
                    // var url = document.getElementById('root');
                    // console.log(url.value);
                    // document.location.href = "http://localhost:3000/";
                }
            })
            .catch(error => console.log('error', error));

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="div" color="primary">
                    <Box fontSize="h3.fontSize" m={1}>
                        SIGN UP
                    </Box>
                </Typography>
                <form className={classes.form}>
                    <TextField
                        onChange={handleChange('name')}
                        value={values.name}
                        error={values.errorName}
                        variant="outlined"
                        id="name"
                        label="Name"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon color="primary" fontSize="default">account_circle</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        style={{ marginTop: 1 }}
                        onChange={handleChange('email')}
                        value={values.email}
                        error={values.errorEmail}
                        variant="outlined"
                        id="e-mail"
                        label="E-mail"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon color="primary" fontSize="default">email</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            error={values.errorPassword}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Icon color="primary">visibility</Icon> : <Icon color="primary">visibility_off</Icon>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    <FormControl className={classes.margin} variant="outlined" style={{ marginTop: 9 }} >
                        <InputLabel htmlFor="outlined-adornment-password">Repit your password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password2}
                            error={values.errorPassword}
                            onChange={handleChange('password2')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Icon color="primary">visibility</Icon> : <Icon color="primary">visibility_off</Icon>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={150}
                        />
                    </FormControl>

                    <Button
                        className={classes.submit}
                        type="button"
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={signUp}
                    >SIGN UP</Button>

                </form>
            </div>
        </Container>

    );
}