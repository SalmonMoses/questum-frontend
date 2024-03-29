import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import LeadboardMain from "./MyGroups(MainPage)/Tabs/leadboardMain"


const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: theme.spacing(100),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('xs')]: {
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: theme.spacing(4),
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: theme.spacing(4),
        },
        // paddingRight: theme.spacing(4),
        // paddingTop: theme.spacing(3)
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
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function GroupId() {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {/* <Container className={classes.cont}> */}
            <LeadboardMain />
            {/* </Container> */}
        </main>
    );
}