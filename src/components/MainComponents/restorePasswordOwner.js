import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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
import { path } from "../consts"
import { strings } from "../../localization"

const useStyles = makeStyles(theme => ({
    paper: {
        // width: theme.spacing(100),
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: "100%"
    }

}));

export default function RestorePasswordOwner() {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [values, setValues] = React.useState({
        email: '',
        token: '',
        password: '',
        showAlert: false,
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submit = () => {

        var raw = JSON.stringify({ "email": values.email });

        var requestOptions = {
            method: 'PUT',
            body: raw,
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        fetch(`${path}restore-pswd/owner`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                enqueueSnackbar("Вам отправленно письмо!)", {
                    variant: 'success',
                });
            })
            .catch(error => {
                enqueueSnackbar("Что-то не так...", {
                    variant: 'error',
                });
                console.log('error', error)
            });
    }


    // document.onkeydown = function (e) {
    //     e = e || window.event;
    //     if (e.keyCode == 13) {
    //         submit();
    //     }
    //     return true;
    // }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img alt="Questerium" src={`${process.env.PUBLIC_URL}/Qlogo.png`} class={classes.logo} />
                <Typography component="div" color="primary">
                    <Box textAlign="center" fontSize="h5.fontSize" m={1}>
                        {strings.PASSWORD_RECOVERY}
                    </Box>
                </Typography>
                <Typography component="div" color="primary">
                    <Box textAlign="center" fontSize="h7.fontSize" m={1}>
                        {strings.PASSWORD_RECOVERY_INFO}
                    </Box>
                </Typography>
                <TextField
                    className={classes.button}
                    onChange={handleChange('email')}
                    value={values.email}
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
                <Button
                    className={classes.button}
                    type="button"
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={submit}
                >{strings.PASSWORD_RECOVERY_CONFIRM}</Button>
                <Box textAlign="center" fontSize="h6.fontSize" m={1}>
                    <Link href="/login/owner" color="primary" >
                        {strings.BACK}
                    </Link>
                </Box>
            </div>
        </Container>

    );
}