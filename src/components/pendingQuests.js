import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { getCookie, setCookie } from "../Cookie"
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import PasswordConfirm from "./passwordConfirm"
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    paper: {
        height: theme.spacing(100),
        marginTop: theme.spacing(0),
        paddingRight: theme.spacing(4),
        // paddingTop: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    cont: {
        marginLeft: theme.spacing(2),
        // background: theme.palette.primary.main,
    },
}));

export default function PendingQuests(props) {

    const [values, setValues] = useState({
        name: props.name,
        edit: false,
        email: props.email,
        password: "",
        password2: "",
        errorPassword: false,
        lang: "Russian",
        showPassword: false,
        error: false,
        text: "",
        dis: "",
    });

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    let cookie = getCookie("refreshToken");

    if (cookie === undefined) {
        history.push("/login/owner");
        enqueueSnackbar("Время сессии истекло, войдите заново.", {
            variant: 'error',
        });
    }

    const classes = useStyles();




    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.paper}>
                <Container className={classes.cont}>


                </Container>
            </Paper>
        </main>
    );
}