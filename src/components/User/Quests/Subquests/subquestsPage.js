import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage } from "../../../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import SubquestStepper from "./subquestStepper"

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: theme.spacing(100),
        marginTop: theme.spacing(0),
        [theme.breakpoints.up('xs')]: { // xs - телефон
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.up('sm')]: {  // sm md lg - планшеты - компы.
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: theme.spacing(4),
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: theme.spacing(4),
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        [theme.breakpoints.up('xs')]: {
            flexGrow: 1,
            padding: theme.spacing(0),
        },
        [theme.breakpoints.up('sm')]: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('lg')]: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
    },
    cont: {
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(0),
            padding: theme.spacing(0),
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(2),
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(2),
            padding: theme.spacing(2),
        },
    },
    width: {
        width: "100%"
    },
    bg: {
        // backgroundColor: theme.palette.secondary.light,
        width: "100%",
    },
    margin: {
        marginTop: theme.spacing(2),
    }
}));

export default function SubquestsPage() {

    let history = useHistory();

    const id = history.location.pathname.slice(12);
    console.log(id);

    const { enqueueSnackbar } = useSnackbar();

    //Проверка на наличие refreshToken
    let cookie = getLocalStorage("refreshToken");

    if (cookie === undefined) {
        history.push("/login/user");
        enqueueSnackbar("Время сессии истекло, войдите заново.", {
            variant: 'error',
        });
    }
    ////////////////////////////////////

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.paper}>
                <Container className={classes.cont} fullWidth>
                    <SubquestStepper />
                </Container>
            </Paper>
        </main>
    );
}