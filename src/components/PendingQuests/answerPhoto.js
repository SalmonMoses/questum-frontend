import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getCookie } from "../../Cookie"
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { ExpansionPanelActions } from '@material-ui/core';
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { path } from "../consts"


const useStyles = makeStyles(theme => ({
    root: {
        width: `calc(100% + ${theme.spacing(6)}px)`,
        marginLeft: theme.spacing(-3),
        // background: theme.palette.primary.main,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        marginLeft: theme.spacing(-1),
        flexGrow: 1,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(-2),
    },
    card: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
        width: '100%',
    },
}));

export default function AnswerPhoto(props) {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {

        const getAnswer = async () => {

            let token = getCookie("token");
            let groupId = getCookie("groupID");
    
            var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };
    
            await fetch(`${path}groups/${groupId}/answer?verification_id=${props.id}`, requestOptions)
                .then(response => response.blob())
                .then(result =>{
                    setAvatar(URL.createObjectURL(result));
                    console.log(result);
                })
                .catch(error => console.log('error', error));
        }
        getAnswer();

    }, [props.groupId, props.id]);

    return (
        <img 
            alt="answer"
            scr={avatar}
        />
    );
}