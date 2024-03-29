import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage, setLocalStorage } from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PendingQuestCard from "./pendingQuestCard"
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { path } from "../consts"
import { strings } from '../../localization'

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: theme.spacing(100),
        marginTop: theme.spacing(0),
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
        // background: theme.palette.primary.main,
    },
    card: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main,
        marginTop: theme.spacing(2),
        width: "100%",
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing(200),
          },
    },
    list: {
        marginBottom: theme.spacing(4),
    },
    heading: {
        width: "100%",
        flexGrow: 1,
        fontSize: theme.typography.pxToRem(25),
        fontWeight: theme.typography.fontWeightRegular,
        // background: theme.palette.primary.main,
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // marginTop: theme.spacing(21),
        paddingTop: theme.spacing(30),
    },
    box: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main,
        alignItems: 'center',
    }
}));


export default function PendingQuests(props) {

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    let cookie = getLocalStorage("refreshToken");

    if (cookie === undefined) {
        history.push("/login/owner");
        enqueueSnackbar(strings.sessionTimeout, {
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
            let token = getLocalStorage("token");
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };
            await fetch(`${path}owners/${getLocalStorage("id")}/groups`, requestOptions)
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
    }, [valuesLast]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.paper}>
                <Container className={classes.cont}>
                    {values.length === 0 ? (
                        <Typography variant="h4" className={classes.text} align="center">
                            <Box className={classes.box}>
                                {strings.noGroups}
                            </Box>
                        </Typography>
                    ) : (
                            <List>
                                {values.map((item, count) => (
                                    <Card className={classes.card}>
                                        <ListItem key={count}>
                                            <Typography className={classes.heading} variant="h2" component="h2">
                                                {item.name}
                                                <PendingQuestCard groupId={item.id} refresh={() => refresh()} />
                                            </Typography>
                                        </ListItem>
                                    </Card>
                                ))}
                            </List>
                        )}
                </Container>
            </Paper>
        </main>
    );
}