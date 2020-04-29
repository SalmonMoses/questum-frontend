/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ResponsiveDrawer from "../MainComponents/ResponsiveDrawer";
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from "./GroupsCard/card";
import { green } from '@material-ui/core/colors';
import Settings from "../Settings/settings";
import NoMatch from "../MainComponents/NoMatch";
import GroupId from "../groupID"
import { Grid } from '@material-ui/core';
import LeadboardMain from "./Tabs/leadboardMain";
import { getLocalStorage, setLocalStorage } from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import PendingQuests from "../PendingQuests/pendingQuests"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { path } from '../consts'
import Help from "../Help/help"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import { strings } from "../../localization"
import { getTokenRole } from "../authorization";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: "100%",
        [theme.breakpoints.up('xs')]: {
            width: "100%",
            // display: 'flex',
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
            padding: theme.spacing(3),
        },
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        [theme.breakpoints.up('lg')]: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        // flexGrow: 1,
        // padding: theme.spacing(3),
    },
    
    leadboard:{
        width: "100%",
        height: theme.spacing(70),
        marginLeft: theme.spacing(0),
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(75),
            // width: "100%",
            // height: "50%",
            marginLeft: theme.spacing(75), 
        },
        [theme.breakpoints.up("xl")]: {
            width: theme.spacing(75),
            // width: "100%",
            // height: "50%",
            marginLeft: theme.spacing(100), 
        },
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    color: {
        background: theme.palette.primary.main,
    },
    width: {
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },
    },
}));


function MyGroups(props) {

    const classes = useStyles();

    const [values, setValues] = useState(false);

    const [url, setUrl] = useState(false);

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();
    
    const matches = useMediaQuery(theme.breakpoints.down('xs') || theme.breakpoints.down('sm') || theme.breakpoints.down('md'));

    useEffect(() => {
        if (!isFinite(history.location.search.slice(4))) {
            if (url !== history.location.search.slice(4)) {
                setValues(true);
            }
            setUrl(history.location.search.slice(4))
        } else {
            setValues(false);
        }
    }, [history.location.search, url]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={matches ? 0 : 5} >
                <Grid item className={classes.width}>
                    <MediaCard token={props.token} loading={props.loading} />
                </Grid>
                {!matches ? (
                    <Grid item className={classes.leadboard}>
                        <LeadboardMain />
                    </Grid>
                ) : (
                        <div></div>
                    )}
            </Grid>
        </main>
    );
}


export default function MainPageAdmin(props) {

    const classes = useStyles();

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    let cookie = getLocalStorage("refreshToken");

    if (cookie === undefined) {
        history.push("/login/owner");
        enqueueSnackbar(strings.sessionTimeout, {
            variant: 'error',
        });
    }

    if(getTokenRole(cookie) !== "owner"){
        history.push("/login/owner");
        enqueueSnackbar(strings.sessionTimeout, {
            variant: 'error',
        });
    }

    return (
        <Router>
            <div className={classes.root}>
                <ResponsiveDrawer />
                <Switch>
                    <Route exact path="/groups">
                        <MyGroups loading={props.loading} />
                    </Route>
                    <Route exact path="/pending-quests">
                        <PendingQuests />
                    </Route>
                    <Route exact path="/settings">
                        <Settings name={getLocalStorage("name")} email={getLocalStorage("email")} />
                    </Route>
                    <Route path="/help" component={Help} />
                    <Route path="/group" component={GroupId} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}