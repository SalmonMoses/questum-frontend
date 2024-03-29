import React, { useState, useEffect } from 'react';
import DrawerUser from "./DrawerUser"
import Me from "./Me/Me"
import Group from "./Group/Group"
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import NoMatch from "../MainComponents/NoMatch"
import { getLocalStorage, setLocalStorage } from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import Help from "./helpUser"
import QuestsUser from "./Quests/questsUser"
import SittingsUser from "./Settings/settingsUser"
import { path } from '../consts'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import { strings } from "../../localization"
import { getTokenRole } from "../authorization"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: "100%",
        [theme.breakpoints.up('xs')]: {
            width: "100%",
            display: 'flex',
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
    },
    leadboard: {
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

export default function MainPageAdmin() {

    const classes = useStyles();

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState("");

    const checkToken = async () => {

        let cookie = getLocalStorage("refreshToken");

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

        await fetch(path + "login/user", requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
                    console.log("RefreshToken: " + cookie);
                    // alert("Время сессии истекло, войдите заново.");
                    history.push("/login/owner");
                    enqueueSnackbar(strings.sessionTimeout, {
                        variant: 'error',
                    });
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
                    setLocalStorage("refreshToken", json.refreshToken, 30);
                    setLocalStorage("id", json.user.id, 30);
                    setLocalStorage("token", json.token, 30);
                    setLocalStorage("name", json.user.name, 30);
                    setLocalStorage("email", json.user.email, 30);
                    setLoading(false);
                    setToken(getLocalStorage("token"));
                    console.log(document.cookie);
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(true);
            });
    }

    useEffect(() => {
        checkToken();
    }, [])

    let cookie = getLocalStorage("refreshToken");

    if (cookie === undefined) {
        history.push("/login/user");
        enqueueSnackbar(strings.sessionTimeout, {
            variant: 'error',
        });
    } else
        if (getTokenRole(cookie) !== "participant") {
            history.push("/login/user");
            enqueueSnackbar(strings.sessionTimeout, {
                variant: 'error',
            });
        }

    return (
        <Router>
            <div className={classes.root}>
                <DrawerUser />
                <Switch>
                    <Route path="/user/me">
                        <Me/>
                    </Route>
                    <Route exact path="/user/group">
                        <Group/>
                    </Route>

                    <Route exact path="/user/quests">
                        <QuestsUser />
                    </Route>

                    <Route exact path="/user/settings">
                        <SittingsUser name={getLocalStorage("name")} email={getLocalStorage("email")} />
                    </Route>

                    <Route path="/user/help" component={Help} />

                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}