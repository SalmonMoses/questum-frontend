import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { getCookie, setCookie } from "../Cookie"
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { ExpansionPanelActions } from '@material-ui/core';
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    list: {
        width: theme.spacing(135),
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

    // window.onload = function () {
    //     refresh();
    // }

    useEffect(() => {

        const getPendingQuests = async () => {

            let token = getCookie("token");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };

            await fetch(`http://localhost:8088/groups/${props.groupId}/pending`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result === valuesLast) {
                        console.log("======");
                        return getPendingQuests();
                      } else {
                      console.log(result);
                      setValues(result);
                      setLoading(false)
                      }



                    // console.log(result)
                    // setValues(result)
                    // setLoading(false)
                })
                .catch(error => {
                    console.log('error', error)
                    setLoading(true)
                });
        }
        getPendingQuests();
        if(loading){
            refreshNew();
        }

    }, [props, props.groupId, valuesLast, loading]);

    return (
        <div className={classes.root}>
        {loading ? (
            <CircularProgress />
        ) : (
            <List>
                {values.map((item, count) => (
                    <ListItem key={count}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                className={classes.list}
                                expandIcon={<Icon>expand_more</Icon>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>{item.user.name}</Typography>
                                <Divider orientation="vertical" variant="inset" />
                                <Typography className={classes.secondaryHeading}>{item.user.email}</Typography>
                                <Divider orientation="vertical" variant="inset" />
                                <Typography className={classes.secondaryHeading}>{item.user.points}</Typography>
                                <Divider orientation="vertical" variant="inset" />
                                <Typography className={classes.secondaryHeading}>{item.subquest.verificationType}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Description:
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
                                            User`s answer:
                                </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >
                                            {item.answer}
                                        </Typography>
                                    </Grid>
                                    <Divider />
                                    <Grid item>
                                        <Typography variant="h6">
                                            Exspected answer:
                                </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >
                                            {item.answer}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button color="primary">
                                    cancel
                                </Button>
                                <Button color="primary">
                                    confirm
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