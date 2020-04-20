import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Divider, Grid, ExpansionPanelActions, Button } from '@material-ui/core';
import { getCookie } from "../../../Cookie";
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import { path } from "../../consts"
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Subquests from "./Subquests/subquestsUser"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    button: {
        marginTop: theme.spacing(1),
    },
    card: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(0),
            width: "100%",
        },
        marginLeft: theme.spacing(-4),
        width: `calc(100% + ${theme.spacing(8)}px)`,
    },
    content: {
        padding: theme.spacing(1.5),
    },
}));

export default function QuestCard(props) {
    const classes = useStyles();

    let history = useHistory();

    const handleClick = () => {
        history.push(`/user/quest/${props.questId}`);
    }

    const [progress, setProgress] = useState(0);

    const getProgress = (prog) => {
        setProgress(prog);
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [valuesQuests, setValuesQuests] = useState([]);

    useEffect(() => {

        const fetchDataQuests = async () => {

            let id = getCookie("groupID");
            console.log("Cookie id: " + id);

            let token = getCookie("token");
            var myHeaders = new Headers();

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };

            await fetch(`${path}groups/${id}/quests`, requestOptions)
                .then(response => {
                    if (response.status === 400) {
                        return undefined;
                    } else {
                        return response.json();
                    }
                })
                .then(result => {
                    if (result === undefined) {
                        console.log("error ")
                    } else {
                        console.log(result);
                        setValuesQuests(result);
                    }
                })
                .catch(error => console.log('error', error));
        }
        fetchDataQuests();
    }, []);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.content}>
                    <Typography variant="h4" component="h2">
                        {props.title}
                    </Typography>
                    <Divider />

                    <Subquests id={props.questId}/>


                    
                        
                </div>
            </Card>
        </div>
    );
}