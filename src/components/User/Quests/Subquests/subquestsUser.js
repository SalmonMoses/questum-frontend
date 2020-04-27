import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage } from "../../../../Cookie"
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
import { path } from "../../../consts"
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import SubquestStepper from "./subquestStepper"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    width: {
        width: "100%"
    },
    bg: {
        // backgroundColor: theme.palette.secondary.light,
        width: "100%",
    },
    margin: {
        marginTop: theme.spacing(2),
    }
}));

export default function Subquests(props) {

    let history = useHistory();

    const id = history.location.pathname.slice(12);
    console.log(id);

    const { enqueueSnackbar } = useSnackbar();

    //Проверка на наличие refreshToken
    let cookie = getLocalStorage("refreshToken");

    if (cookie === undefined) {
        history.push("/login/user");
        enqueueSnackbar("Время сессии истекло, войдите заново.", {
            variant: 'error',
        });
    }
    ////////////////////////////////////

    const classes = useStyles();

    const groupId = getLocalStorage("groupID");

    const [valuesSubQuests, setValuesSubQuests] = useState([]);

    const [activeStep, setActiveStep] = React.useState(0);

    const [progress, setProgress] = useState({
        prog: 0,
        length: 0,
        result: 0,
    });

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {

        const fetchAllQuests = async () => {

            let token = getLocalStorage("token");

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };

            await fetch(`${path}participants/${getLocalStorage("id")}/progress/${props.id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log("all subquests: ")
                    console.log(result);
                    setValuesSubQuests(result.subquests);
                    setProgress({ ...progress, prog: result.progress, length: result.subquests.length, result: result.progress * 100 / result.subquests.length });
                    if ((result.progress ^ 0) === result.progress) {
                        setActiveStep(result.progress);
                    } else {
                        setActiveStep(Math.floor(result.progress));
                    }
                })
                .catch(error => console.log('error', error));
        }
        fetchAllQuests();
    }, [id]);

    return (
        <div>
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
            {valuesSubQuests.map((item, count) => (

                <ExpansionPanel expanded={expanded === 'panel' + (count + 1)} onChange={handleChange('panel' + (count + 1))}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>{item.title}</Typography>
                        <Typography className={classes.secondaryHeading}></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {item.desc}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
}