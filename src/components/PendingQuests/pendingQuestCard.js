import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getLocalStorage } from "../../Cookie"
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { ExpansionPanelActions } from '@material-ui/core';
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { path } from "../consts"
import AnswerPhoto from "./answerPhoto"
import { strings } from '../../localization'


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

export default function PendingQuestCard(props) {
    const classes = useStyles();

    const [values, setValues] = useState([]);

    const [valuesLast, setValuesLast] = useState([]);

    const [loading, setLoading] = useState(true);


    const refreshNew = () => {
        setValuesLast(values);
        console.log("refreshhhhhh.......");
    }

    const handleClick = async (prop) => {

        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        // var raw = JSON.stringify({ "userId": prop.userId, "subquestId": prop.subquestId, "verified": prop.verified });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            // body: raw,
            redirect: 'follow'
        };

        await fetch(`${path}groups/${props.groupId}/${prop.status}?verification_id=${prop.subquestId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        refreshNew();
    }

    useEffect(() => {

        const getPendingQuests = async () => {

            let token = getLocalStorage("token");
            console.log("token: " + token)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };

            await fetch(`${path}groups/${props.groupId}/pending`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setValues(result)
                    setLoading(false)
                })
                .catch(error => {
                    console.log('error', error)
                    setLoading(true)
                });
        }
        getPendingQuests();

    }, [props.groupId, valuesLast]);

    return (
        <div className={classes.root}>
            {loading ? (
                <CircularProgress />
            ) : values.length === 0 ? (
                <Typography variant="h5" align="center">
                    <Box>
                        {strings.noPendingQuests}
                    </Box>
                </Typography>
            ) : (
                        <List>
                            {values.map((item, count) => (
                                <ListItem key={count} >
                                    <ExpansionPanel className={classes.card}>
                                        <ExpansionPanelSummary
                                            expandIcon={<Icon>expand_more</Icon>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography fullWidth className={classes.heading}>{item.user.name}</Typography>
                                            <Divider orientation="vertical" variant="inset" />
                                            <Typography className={classes.heading}>{item.subquest.desc}</Typography>
                                            <Divider orientation="vertical" variant="inset" />
                                            <Typography className={classes.secondaryHeading}>{item.subquest.verificationType}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Grid>
                                                <Grid item>
                                                    <Typography variant="h6">
                                                    {`${strings.description}: `}
                                                </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography>
                                                        {item.subquest.desc}
                                                    </Typography>
                                                </Grid>
                                                <Divider />
                                                <Grid item>
                                                    <Typography variant="h6">
                                                    {strings.memberAnswer}
                                                 </Typography>
                                                </Grid>
                                                {
                                                    item.subquest.verificationType === "IMAGE" ? (
                                                      <AnswerPhoto id={item.id} groupId={props.groupId}/>
                                                    ) : (
                                                            <Grid item>
                                                                <Typography >
                                                                    {item.answer}
                                                                </Typography>
                                                            </Grid>
                                                        )
                                                }
                                                <Divider />
                                                <Grid item>
                                                    <Typography variant="h6">
                                                    {`${strings.expectAnswer}: `}
                                                 </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography >
                                                        {item.expectedAnswer}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ExpansionPanelDetails>
                                        <ExpansionPanelActions>
                                            <Button onClick={() => handleClick({ status: "reject", subquestId: item.id })} color="primary">
                                            {strings.CANCEL}
                                        </Button>
                                            <Button onClick={() => handleClick({ status: "verify", subquestId: item.id })} color="primary">
                                            {strings.CONFIRM}
                                        </Button>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>
                                </ListItem>
                            ))}
                        </List>
                    )}
        </div>
    );
}