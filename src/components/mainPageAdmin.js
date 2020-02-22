import React from 'react';
import ResponsiveDrawer from "./ResponsiveDrawer"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MediaCard from "./card"
import Leadboard from "./leadboard"
import { Grid } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    title: {
        marginTop: theme.spacing(-7),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function MyGroups() {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={5} >
                <Grid item >
                    <MediaCard />
                </Grid>
                <Grid item >
                    <Leadboard />
                </Grid>
            </Grid>
            {/* <MediaCard />
                <Leadboard /> */}
        </main>
    );
}


export default function MainPageAdmin() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ResponsiveDrawer />
            <Router>
             <Switch>
                 <Route exact path="/home/groups" component={MyGroups} />
                 {/* <Route exact path="/home/" component={MainPageAdmin} /> */}
             </Switch>
            </Router>
            {/* <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={5} >
                    <Grid item >
                        <MediaCard />
                    </Grid>
                    <Grid item >
                        <Leadboard />
                    </Grid>
                </Grid>
                <MediaCard />
                <Leadboard />

            </main> */}
        </div>
    );
}