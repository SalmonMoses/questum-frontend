import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getCookie } from "../../../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Icon from '@material-ui/core/Icon';
import {path} from "../../../consts"
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import SubquestStepper from "./subquestStepper"

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: theme.spacing(100),
        marginTop: theme.spacing(0),
        [theme.breakpoints.up('xs')]: { // xs - телефон
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.up('sm')]: {  // sm md lg - планшеты - компы.
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: theme.spacing(4),
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: theme.spacing(4),
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
            padding: theme.spacing(0),
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(2),
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(2),
            padding: theme.spacing(2),
        },
    },
    width:{
        width: "100%"
    },
    bg:{
        // backgroundColor: theme.palette.secondary.light,
        width: "100%",
    },
    margin:{
        marginTop: theme.spacing(2),
    }
}));

export default function SubquestsPage() {

    let history = useHistory();

    const id = history.location.pathname.slice(12);
    console.log(id);

    const { enqueueSnackbar } = useSnackbar();

    //Проверка на наличие refreshToken
    let cookie = getCookie("refreshToken");

    if (cookie === undefined) {
        history.push("/login/user");
        enqueueSnackbar("Время сессии истекло, войдите заново.", {
            variant: 'error',
        });
    }
    ////////////////////////////////////

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const [valuesSubQuests, setValuesSubQuests] = useState([]);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // useEffect(() => {

    //     const fetchAllQuests = async () => {

    //         let token = getCookie("token");

    //         var myHeaders = new Headers();

    //         myHeaders.append("Content-Type", "application/json");

    //         myHeaders.append("Authorization", "Bearer " + token);

    //         var requestOptions = {
    //             method: 'GET',
    //             redirect: 'follow',
    //             headers: myHeaders,
    //         };

    //         await fetch(`${path}quests/${id}/subquests`, requestOptions)
    //             .then(response => response.json())
    //             .then(result => {
    //                 console.log("all subquests: ")
    //                 console.log(result);
    //                 setValuesSubQuests(result);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     fetchAllQuests();
    // }, [id]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.paper}>
                <Container className={classes.cont} fullWidth>
                <Typography variant="h4" component="h2">
                        {/* {props.title} */}
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
                    <Divider className={classes.margin}/>
                    <SubquestStepper />
                    {/* <List dense="true" className={classes.width}>
                        {valuesSubQuests.map((item, count) => (
                            <ListItem key={count} className={classes.width}>
                                <ExpansionPanel expanded={expanded === 'panel' + (item.order + 1)} onChange={handleChange('panel' + (item.order + 1))} className={classes.bg} fullWidth>
                                    <ExpansionPanelSummary
                                        className={classes.width}
                                        expandIcon={<Icon>expand_more</Icon>}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={classes.heading}>Quest {item.order + 1}</Typography>
                                        <Typography className={classes.secondaryHeading}>{item.verificationType}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <div fullWidth>
                                            <Typography variant="h6" component="h2" gutterBottom>
                                                {"Description: " + item.desc}
                                            </Typography>

                                            <Typography variant="h6" gutterBottom>
                                                {`Expected answer: ${item.expectedAnswer} \n`}
                                            </Typography>
                                        </div>

                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <DeleteSubquest subquestId={item.id} refresh={() => refreshNew()} />
                                        <EditSubquest subquestId={item.id} refresh={() => refreshNew()} verificationType={item.verificationType} desc={item.desc} />
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            </ListItem>
                        ))}
                    </List> */}


                </Container>
            </Paper>
        </main>
    );
}