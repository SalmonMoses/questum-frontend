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
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { OutlinedInput } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { path } from "./components/consts"
import { strings } from './localization'
import Link from '@material-ui/core/Link';
import { setLocalStorage } from "./Cookie"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    lang: {
        position: 'fixed',
        top: theme.spacing(2),
        right: theme.spacing(4),
        color: theme.palette.primary.main,
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
        checked: false,
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

    const handleChangeCheckbox = (event) => {
        setValues({ ...values, checked: event.target.checked });
    };

    function validateEmail(email) {
        // var r = /^\w+@\w+\.\w{2,4}$/i;
        var r = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;
        return r.test(String(email).toLowerCase());
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lang) => {
        setLocalStorage("lang", lang);
        handleClose();
        document.location.reload();
    }


    const { enqueueSnackbar } = useSnackbar();

    let history = useHistory();


    const signUp = () => {
        let error = false;

        if (!values.checked) {
            enqueueSnackbar(strings.PRIVACY, {
                variant: 'error',
            });
        }

        if (values.name.length < 3) {
            enqueueSnackbar(strings.longerName, {
                variant: 'error',
            });
            setValues({ ...values, errorName: true });
            error = true;
        } else {
            setValues({ ...values, errorName: false });
        }
        if (!validateEmail(values.email)) {
            console.log("Incorrect email!");
            enqueueSnackbar(strings.correctEmail, {
                variant: 'error',
            });
            setValues({ ...values, errorEmail: true });
            error = true;
        } else {
            setValues({ ...values, errorEmail: false });
        }
        if (values.password.length < 5) {
            console.log("Password should be more the 5 simbols!");
            enqueueSnackbar(strings.longerPasswd, {
                variant: 'error',
            });
            setValues({ ...values, errorPassword: true });
            error = true;
        } else {
            setValues({ ...values, errorPassword: false });
        }
        if (values.password !== values.password2) {
            console.log("Passwords should be equal!");
            enqueueSnackbar(strings.passwdMissmatch, {
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

        fetch(`${path}signup/owner`, requestOptions)
            .then(response => {
                if (response.status === 409) {
                    enqueueSnackbar(strings.registeredEmail, {
                        variant: 'warning',
                    });
                    setValues({ ...values, errorEmail: true });
                    return;
                }
                return response.json();
            })
            .then(result => {
                if (result.owner === null) {
                } else {
                    console.dir(result);
                    enqueueSnackbar(strings.completeRegistr, {
                        variant: 'success'
                    });
                    setValues({ ...values, logged: true });
                    setLocalStorage("refreshToken", result.refreshToken, 10);
                    setLocalStorage("token", result.token, 30);
                    history.push('/');
                }
            })
            .catch(error => console.log('error', error));

    }

    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            signUp();
        }
        return true;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Button
                className={classes.lang}

                edge="end"
                aria-label="change language"
                aria-controls="lang"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
            >
                Language<Icon>translate</Icon>
            </Button>
            <Menu
                id="lang"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem value={"Russian"} onClick={() => changeLanguage('ru')}>Russian</MenuItem>
                <MenuItem value={"English"} onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem value={"Ukrainian"} onClick={() => changeLanguage('ua')}>Ukrainian</MenuItem>
            </Menu>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="div" color="primary">
                    <Box fontSize="h3.fontSize" m={1}>
                        {strings.sighUp}
                    </Box>
                </Typography>
                <form className={classes.form}>
                    <TextField
                        onChange={handleChange('name')}
                        value={values.name}
                        error={values.errorName}
                        variant="outlined"
                        id="name"
                        label={strings.name}
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
                        label={strings.eMail}
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
                        <InputLabel htmlFor="outlined-adornment-password">{strings.passwd}</InputLabel>
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
                        <InputLabel htmlFor="outlined-adornment-password">{strings.repeatPasswd}</InputLabel>
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
                            labelWidth={160}
                        />
                    </FormControl>
                    <Checkbox
                        value={values.checked}
                        onChange={handleChangeCheckbox}
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                    />
                    {strings.I_AGREE} {' '}
                    <Link color="primary" href="/docs/eula">
                        {strings.AGREEMENT}
                    </Link>{' ' + strings.AND + " "}
                    <Link color="primary" href="/docs/privacy">
                        {strings.PRIVACY_POLICY} Questerium
                    </Link>{' '}
                    <Button
                        className={classes.submit}
                        type="button"
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={signUp}
                    >{strings.SIGN_UP}</Button>
                </form>
            </div>
        </Container>

    );
}