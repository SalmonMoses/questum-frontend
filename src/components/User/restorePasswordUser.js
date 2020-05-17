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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { setLocalStorage } from "../../Cookie"

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
    },
    lang: {
        position: 'fixed',
        top: theme.spacing(2),
        right: theme.spacing(4),
        color: theme.palette.primary.main,
    },

}));

export default function RestorePasswordUser() {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [values, setValues] = React.useState({
        email: '',
        id: '',
    });

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

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submit = () => {

        var raw = JSON.stringify({"email": values.email, "group": values.id});

        var requestOptions = {
            method: 'PUT',
            body: raw,
            headers: {
                'Content-Type': 'application/json'
              },
            redirect: 'follow'
        };

        fetch(`${path}restore-pswd/participant`, requestOptions)
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
                console.log('error', error)});
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
                        disabled={values.disabled}
                        error={values.showAlert}
                        onChange={handleChange('id')}
                        value={values.id}
                        fullWidth
                        color="primary"
                        variant="outlined"
                        id="input-with-icon-textfield"
                        label="Group ID"

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon color="primary" fontSize="default">group</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />
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
                    <Link href="/login/user" color="primary" >
                        {strings.BACK}
                    </Link>
                </Box>
            </div>
        </Container>

    );
}