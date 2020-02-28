import React from 'react';
import ResponsiveDrawer from "./ResponsiveDrawer";
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from "./card";
import Leadboard from "./leadboard";
import Sittings from "./settings";
import NoMatch from "./NoMatch";
import { Grid } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
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
        </main>
    );
}


export default function MainPageAdmin() {

    const classes = useStyles();

    return (
        <Router>
        <div className={classes.root}>
            <ResponsiveDrawer />
             <Switch>
                 <Route exact path="/groups" component={MyGroups} />
                 <Route exact path="/settings" component={Sittings} />
                 <Route path="*" component={NoMatch} />
             </Switch>
             </div>
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
            </Router>
    );
}