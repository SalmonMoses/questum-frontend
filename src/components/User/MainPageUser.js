import React, { useState, useEffect } from 'react';
import DrawerUser from "./DrawerUser"
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import NoMatch from "../MainComponents/NoMatch"
import { getCookie, setCookie } from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Help from "./helpUser"
import QuestsUser from "./Quests/questsUser"
import { useTheme } from '@material-ui/core/styles';
import ResDrawer from "./ResDrawer"
import SittingsUser from "./Settings/settingsUser"
import { path } from '../consts'
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

        let cookie = getCookie("refreshToken");

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
                    enqueueSnackbar("Время сессии истекло, войдите заново.", {
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
                    setCookie("refreshToken", json.refreshToken, 30);
                    setCookie("id", json.user.id, 30);
                    setCookie("token", json.token, 30);
                    setCookie("name", json.user.name, 30);
                    setCookie("email", json.user.email, 30);
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
        checkToken();
    }, [])

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
                <DrawerUser />
                <Switch>

                    <Route exact path="/user/group">
                        {/* <MyGroups loading={loading} /> */}
                    </Route>

                    <Route exact path="/user/quests">
                        <QuestsUser />
                    </Route>

                    <Route exact path="/user/settings">
                        <SittingsUser name={getCookie("name")} email={getCookie("email")} />
                    </Route>

                    <Route path="/user/help" component={Help} />

                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}