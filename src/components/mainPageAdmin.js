/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ResponsiveDrawer from "./ResponsiveDrawer";
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from "./card";
import { green } from '@material-ui/core/colors';
import Settings from "./settings";
import NoMatch from "./NoMatch";
import GroupId from "./groupID"
import { Grid } from '@material-ui/core';
import LeadboardMain from "./leadboardMain";
import { getCookie, setCookie } from "../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import PendingQuests from "./pendingQuests"
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
    [theme.breakpoints.down('sm')]: {
        leadboard: {
            // width: theme.spacing(75),
            width: `calc(100% - ${50}px)`,
            height: theme.spacing(70),
            marginLeft: theme.spacing(0),
        },
    },
    [theme.breakpoints.up('md')]: {
        leadboard: {
            width: theme.spacing(75),
            height: theme.spacing(70),
            marginLeft: theme.spacing(0),
        },
    },
    [theme.breakpoints.up('lg')]: {
        leadboard: {
            width: theme.spacing(75),
            height: theme.spacing(70),
            marginLeft: theme.spacing(75),
        },
    },
    // leadboard:{
    //     width: theme.spacing(75),
    //     height: theme.spacing(70),
    //     marginLeft: theme.spacing(75),
    // },
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
}));


function MyGroups(props) {

    const classes = useStyles();

    const [values, setValues] = useState(false);

    const [url, setUrl] = useState(false);

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState("");

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const checkToken = async () => {

        let cookie = getCookie("refreshToken");

        if (cookie === undefined) {
            history.push("/login/owner");
            enqueueSnackbar("Время сессии истекло, войдите зановоjjjj.", {
                variant: 'error',
            });
        }

        console.dir(document.cookie);

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "refreshToken": cookie });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://localhost:8088/login/owner", requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
                    // alert("Время сессии истекло, войдите заново.");
                    history.push("/login/owner");
                    enqueueSnackbar("Время сессии истекло, войдите заново222.", {
                        variant: 'error',
                    });
                    window.location.reload();
                    return;
                }
                return response.json();
            })
            .then(json => {
                if (json === undefined) {
                    return;
                } else {
                    console.dir(json.refreshToken + 'SUCCES');
                    console.dir(json.token + ' - token');
                    setCookie("refreshToken", json.refreshToken, 30);
                    setCookie("id", json.owner.id, 30);
                    setCookie("token", json.token, 30);
                    setCookie("name", json.owner.name, 30);
                    setCookie("email", json.owner.email, 30);
                    setLoading(false);
                    setToken(getCookie("token"));
                    console.log(document.cookie);
                    // enqueueSnackbar(document.cookie, {
                    //   variant: 'success',
                    // });
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(true);
            });
    }

    useEffect(() => {
        if (!isFinite(history.location.search.slice(4))) {
            if (url !== history.location.search.slice(4)) {
                setValues(true);
            }
            setUrl(history.location.search.slice(4))
        } else {
            setValues(false);
        }
        checkToken();
    }, [history.location.search, url]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
                <Grid container spacing={5} >
                <Grid item >
                    <MediaCard token={props.token} loading={loading}/>
                </Grid>
                <Grid item className={classes.leadboard}>
                    <LeadboardMain flag={values} />
                </Grid>
            </Grid>
        </main>
    );
}


export default function MainPageAdmin() {

    const classes = useStyles();

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    // const checkToken = () => {

    //     let cookie = getCookie("refreshToken");

    //     if(cookie === undefined){
    //         history.push("/login/owner");
    //         enqueueSnackbar("Время сессии истекло, войдите заново.", {
    //           variant: 'error',
    //         });
    //     }

    //     console.dir(document.cookie);

    //     var myHeaders = new Headers();

    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({"refreshToken": cookie});

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("http://localhost:8088/login/owner", requestOptions)
    //         .then(response => {
    //             if (response.status === 401) {
    //                 console.log("Authorization error");
    //                 // alert("Время сессии истекло, войдите заново.");
    //                 history.push("/login/owner");
    //                 enqueueSnackbar("Время сессии истекло, войдите заново.", {
    //                   variant: 'error',
    //                 });
    //                 return;
    //             }
    //             return response.json();
    //         })
    //         .then(json => {
    //             if (json === undefined) {
    //                 return;
    //             } else {
    //                 console.dir(json.refreshToken + 'SUCCES');
    //                 console.dir(json.token + ' - token');
    //                 setCookie("refreshToken", json.refreshToken, 30);
    //                 setCookie("id", json.owner.id, 30);
    //                 setCookie("token", json.token, 30);
    //                 setCookie("name", json.owner.name, 30);
    //                 setCookie("email", json.owner.email, 30);
    //                 enqueueSnackbar(document.cookie, {
    //                   variant: 'success',
    //                 });
    //             }
    //         })
    //         .catch(console.log);
    // }

    // checkToken();

    let cookie = getCookie("refreshToken");

    if (cookie === undefined) {
        history.push("/login/owner");
        enqueueSnackbar("Время сессии истекло, войдите заново.", {
            variant: 'error',
        });
    }

    return (
        <Router>
            <div className={classes.root}>
                <ResponsiveDrawer />
                <Switch>
                    <Route exact path="/groups">
                        <MyGroups />
                    </Route>
                    <Route exact path="/pending-quests">
                        <PendingQuests />
                    </Route>
                    <Route exact path="/settings">
                        <Settings name={getCookie("name")} email={getCookie("email")} />
                    </Route>
                    <Route path="/group" component={GroupId} />

                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}