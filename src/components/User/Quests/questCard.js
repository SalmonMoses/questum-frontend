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
        backgroundColor: theme.palette.background.paper,
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

    const handleClick = ()=>{
        history.push(`/user/quest/${props.questId}`);
    }

    const [progress, setProgress] = useState(0);

    const getProgress = (prog) =>{
        setProgress(prog);
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.content}>
                    <Typography variant="h4" component="h2">
                        {props.title}
                    </Typography>
                    <Divider />
                    <Grid container direction="row" spacing={1}>
                        <Grid item >
                            <Typography variant="h6" component="h2">
                                Progress:
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant="h6" component="h2">
                                40%
                            </Typography>
                        </Grid>
                    </Grid>
                    <LinearProgress variant="determinate" value={40} />
                    <Button onClick={handleClick} className={classes.button} fullWidth variant="outlined" color="primary">Open</Button>
                </div>
            </Card>
        </div>
    );
}