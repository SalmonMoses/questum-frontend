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
import { getCookie, setCookie } from "../../Cookie"
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
    // [theme.breakpoints.down('sm')]: {
    //     leadboard: {
    //         // width: theme.spacing(75),
    //         width: `calc(100% - ${50}px)`,
    //         height: theme.spacing(70),
    //         marginLeft: theme.spacing(0),
    //     },
    // },
    // [theme.breakpoints.up('md')]: {
    //     leadboard: {
    //         width: theme.spacing(75),
    //         height: theme.spacing(70),
    //         marginLeft: theme.spacing(0),
    //     },
    // },
    // [theme.breakpoints.up('lg')]: {
    //     leadboard: {
    //         width: theme.spacing(75),
    //         height: theme.spacing(70),
    //         marginLeft: theme.spacing(75),
    //     },
    // },
    leadboard:{
        width: "100%",
        height: theme.spacing(70),
        marginLeft: theme.spacing(0),
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(75),
            marginLeft: theme.spacing(75), 
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
        // checkToken();
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
                {/* <Grid item className={classes.leadboard}>
                    <LeadboardMain flag={values} />
                </Grid> */}
            </Grid>
        </main>
    );
}


export default function MainPageAdmin(props) {

    const classes = useStyles();

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    // const checkToken = async () => {

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

    //    await  fetch("http://localhost:8088/login/owner", requestOptions)
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

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState("");

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

        await fetch(path + "login/owner", requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
                    console.log("RefreshToken: " + cookie);
                    // alert("Время сессии истекло, войдите заново.");
                    history.push("/login/owner");
                    enqueueSnackbar("Время сессии истекло, войдите заново.", {
                        variant: 'error',
                    });
                    // enqueueSnackbar("Время сессии истекло, войдите заново222.", {
                    //     variant: 'error',
                    // });
                    // window.location.reload();
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

    // useEffect(() => {
    //     checkToken();
    // }, [])

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
                        <MyGroups loading={props.loading} />
                    </Route>
                    <Route exact path="/pending-quests">
                        <PendingQuests />
                    </Route>
                    <Route exact path="/settings">
                        <Settings name={getCookie("name")} email={getCookie("email")} />
                    </Route>
                    <Route path="/help" component={Help} />
                    <Route path="/group" component={GroupId} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}