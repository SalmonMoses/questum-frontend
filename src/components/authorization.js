import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from "../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { path } from './consts'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

const useStyles = makeStyles(theme => ({
    div: {
        marginTop: theme.spacing(43),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

export default function Authorization(props) {

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState("");

    const history = useHistory();

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const checkUser = async () => {
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
                    // history.push("/login/user");
                    // enqueueSnackbar("AUTH PAGE Время сессии истекло, войдите заново.", {
                    //     variant: 'error',
                    // });
                    props.auth(true);
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
                    history.push("/user/group");
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

    const checkOwner = async () => {

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

        await fetch(path + "login/owner", requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
                    console.log("RefreshToken: " + cookie);
                    // alert("Время сессии истекло, войдите заново.");
                    // history.push("/login/owner");
                    // enqueueSnackbar("AUTH PAGE Время сессии истекло, войдите заново.", {
                    //     variant: 'error',
                    // });
                    props.auth(true);
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
                    history.push("/groups");
                    props.auth(false);
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
        checkOwner();
        checkUser();
        if(loading){
            history.push("/login/user/");
        }
    }, [loading]);

    return (
        <div className={classes.div}>
        <CircularProgress />
        </div>
    )
}