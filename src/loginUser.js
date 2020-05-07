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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link'
import { useSnackbar } from 'notistack';
import { path } from "./components/consts"
import { useHistory } from "react-router-dom";
import { setLocalStorage } from "./Cookie";
import { strings } from './localization'



const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper1: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    margin: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    root: {

        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: theme.spacing(10),
            marginLeft: theme.spacing(70),
            width: theme.spacing(50),
            height: theme.spacing(70),
        },
    },
    logo: {
        marginBottom: theme.spacing(2)
    }
}));



export default function LoginUser() {
    const classes = useStyles();

    const history = useHistory();

    const [values, setValues] = React.useState({
        email: '',
        token: '',
        password: '',
        showPassword: false,
        showAlert: false,
        error: 'Group ID',
        disabled: false,
        login: false,
    });

    const [checked, setChecked] = React.useState(false);

    const [button, setButton] = React.useState({
        label: 'SUBMIT',
        icon: 'group_add',
    });

    const { enqueueSnackbar } = useSnackbar();



    const handleSubmit = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${path}check/group?id=${values.token}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.exists) {
                    setChecked(prev => true);
                    setButton({ label: 'LOG IN', icon: 'how_to_reg' });
                    setValues({ ...values, showAlert: false, error: 'Group ID', disabled: true });
                } else {
                    setValues({ ...values, showAlert: true, error: 'Group ID has not found', disabled: false });
                }
            })
            .catch(error => console.log('error', error));


    };

    const handleSubmitFull = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "groupId": values.token, "email": values.email, "password": values.password });

        var requestOptions1 = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${path}login/user`, requestOptions1)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error")
                    enqueueSnackbar(strings.correctEmailPasswd, {
                        variant: 'error',
                    });
                    return;
                }
                return response.json();
            })
            .then(result => {
                console.dir(result);
                if (result === undefined) {
                    return;
                } else {
                    console.dir(result.refreshToken);
                    setLocalStorage("refreshToken", result.refreshToken, 10);
                    setLocalStorage("token", result.token, 30);
                    setLocalStorage("groupID", values.token, 30);
                    console.dir(document.cookie);
                    // enqueueSnackbar(`Вы вошли как ${result.user.name}`, {
                    //     variant: 'success',
                    // });
                    history.push("/user");
                }
            })
            .catch(error => console.log('error', error));
    }

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            if (values.disabled) {
                handleSubmitFull();
            } else {
                handleSubmit();
            }
        }
        return true;
    }

    return (
        <div className={classes.paper}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={`${process.env.PUBLIC_URL}/Qlogo.png`} className={classes.logo} />
                    <Typography component="div" color="primary">
                        <Box fontSize="h4.fontSize" m={2}>
                            {strings.logIn}
                        </Box>
                    </Typography>
                    <TextField
                        disabled={values.disabled}
                        error={values.showAlert}
                        onChange={handleChange('token')}
                        value={values.token}
                        fullWidth
                        color="primary"
                        variant="outlined"
                        id="input-with-icon-textfield"
                        label={values.error}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon color="primary" fontSize="default">group</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit >
                        <div>
                            <TextField
                                className={classes.paper1}
                                fullWidth
                                value={values.email}
                                onChange={handleChange('email')}
                                color="primary"
                                variant="outlined"
                                id="email"
                                label={strings.eMail}
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
                        </div>



                    </Slide>
                </div>

                <Button
                    className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<Icon>{button.icon}</Icon>}
                    onClick={values.disabled ? handleSubmitFull : handleSubmit}
                >{button.label}</Button>
                <Typography component='div'>
                    <Box textAlign="center" fontSize="h7.fontSize" m={0}>
                        <Link href="/login/owner" >
                            {strings.signInAsOwner}
                        </Link>
                    </Box>
                    <Box textAlign="center" fontSize="h7.fontSize" m={1}>
                        <Link href="/participant/restore-password" color="primary" >
                            {strings.forgotPasswd}
                        </Link>
                    </Box>
                </Typography>

            </Container>
        </div>
    );
}