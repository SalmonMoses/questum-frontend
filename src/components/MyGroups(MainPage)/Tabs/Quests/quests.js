import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import AddSubQuest from "./Subquests/addSubQuest";
import { Divider, Grid, ExpansionPanelActions } from '@material-ui/core';
import { getLocalStorage } from "../../../../Cookie";
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import DeleteQuest from "./deleteQuest"
import DeleteSubquest from "./Subquests/deleteSubquest";
import EditSubquest from "./Subquests/editSubquest"
import EditQuest from "./editQuest"
import { path } from "../../../consts"
import { strings } from '../../../../localization'

const useStyles = makeStyles(theme => ({
    root: {
        // [theme.breakpoints.up('lg')]: {
        //     padding: theme.spacing(-2)
        // },
        width: "100%",
        // width: `calc(100% + ${theme.spacing(6)}px)`, //100%
        // marginLeft: theme.spacing(-3),
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 1,
        flexGrow: 1,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    bg: {
        backgroundColor: theme.palette.background.default,
        width: "100%",
    },
    button: {
        marginBottom: theme.spacing(5),
    },
    list: {
        width: theme.spacing(59),
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(46),
        },
    },
    icon: {
        marginLeft: theme.spacing(15),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(10),
        },
    },
    title: {
        marginLeft: theme.spacing(0)
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
    width: {
        width: "100%",
    },
    color:{
        background: theme.palette.primary.main,
    }
}));

export default function Quests(props) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const [valuesSubQuests, setValuesSubQuests] = useState([]);

    const [valuesLastSubQuests, setValuesLastSubQuests] = useState([]);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let history = useHistory();

    const refreshNew = () => {
        setValuesLastSubQuests(valuesSubQuests);
    }

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

            await fetch(`${path}quests/${props.id}/subquests`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log("all subquests: ")
                    console.log(result);
                    setValuesSubQuests(result);
                })
                .catch(error => console.log('error', error));
        }
        fetchAllQuests();
    }, [history.location.search, props.id, valuesLastSubQuests]);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <List dense="true" className={classes.width}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item className={classes.title} xs={6}>
                            <Typography variant="h4" component="h2">
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.icon}>
                            <DeleteQuest questTitle={props.title} questId={props.id} refresh={() => props.refresh()} />
                        </Grid>
                        <Grid item>
                            <EditQuest questTitle={props.title} questId={props.id} refresh={() => props.refresh()} />
                        </Grid>
                    </Grid>
                    {valuesSubQuests.map((item, count) => (
                        <ListItem key={count} className={classes.width}>
                            <ExpansionPanel expanded={expanded === 'panel' + (item.order + 1)} onChange={handleChange('panel' + (item.order + 1))} className={classes.bg} fullWidth>
                                <ExpansionPanelSummary
                                    className={classes.width}
                                    expandIcon={<Icon>expand_more</Icon>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>{strings.quest}{item.order + 1}</Typography>
                                    <Typography className={classes.secondaryHeading}>{item.verificationType}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <div fullWidth>
                                <Typography variant="h6" component="h2"  gutterBottom>
                                {`${strings.description}: ${item.desc}`}
                                    </Typography>
                               
                                    {item.expectedAnswer && <Typography variant="h6" gutterBottom>
                                        {`${strings.expectAnswer}: ${item.expectedAnswer} \n`}
                                    </Typography>}
                                </div>
        
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <DeleteSubquest subquestId={item.id} refresh={() => refreshNew()} name={strings.quest + " " + (item.order + 1)}/>
                                    <EditSubquest subquestId={item.id} refresh={() => refreshNew()} verificationType={item.verificationType} desc={item.desc} />
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        </ListItem>
                    ))}
                </List>
                <AddSubQuest questId={props.id} refresh={() => refreshNew()} />
                <div className={classes.button} />
                <Divider />
            </Card>
        </div>
    );
}