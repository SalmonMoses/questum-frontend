import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getCookie, setCookie } from "../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PendingQuestCard from "./pendingQuestCard"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: theme.spacing(100),
        marginTop: theme.spacing(0),
        paddingRight: theme.spacing(4),
        // paddingTop: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    cont: {
        marginLeft: theme.spacing(2),
        // background: theme.palette.primary.main,
    },
}));

export default function PendingQuests(props) {

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    let cookie = getCookie("refreshToken");

    if (cookie === undefined) {
        history.push("/login/owner");
        enqueueSnackbar("Время сессии истекло, войдите заново.", {
            variant: 'error',
        });
    }

    const classes = useStyles();

    const [values, setValues] = useState([]);

    const [valuesLast, setValuesLast] = useState([]);

    const [loading, setLoading] = useState(true);

    const refresh = () => {
        setValuesLast(values);
        console.log("refreshhhhhh.......");
    }

    window.onload = function () {
        refresh();
    }

    useEffect(() => {
        const fetchData = async () => {
            let token = getCookie("token");
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };
            await fetch(`http://localhost:8088/owners/${getCookie("id")}/groups`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data === valuesLast) {
                        console.log("======");
                        return fetchData();
                      } else {
                      console.log(data);
                      setValues(data);
                      setLoading(false);
                      }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
        fetchData();

        // if (loading) {
        //     refresh();
        // }
    }, [valuesLast]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.paper}>
                <Container className={classes.cont}>
                {loading ? (
                    <CircularProgress color="secondary"/>
                ) : (
                    <List >
                        {values.map((item, count) => (
                            <ListItem key={count}>
                                <Typography variant="h2" component="h2">
                                    {item.name}
                                    <PendingQuestCard groupId={item.id} refresh={() => refresh()}/>
                                    <Divider />
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                )}
                </Container>
            </Paper>
        </main>
    );
}