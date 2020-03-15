import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import AddSubQuest from "./addSubQuest";
import { Divider } from '@material-ui/core';
import { getCookie } from "../Cookie";
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    bg: {
        backgroundColor: theme.palette.background.default,
    },
    button: {
        marginBottom: theme.spacing(5),
    },
    list: {
        width: theme.spacing(59),
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

            let id = getCookie("groupId");
            console.log("Cookie id: " + id);
            if (history.location.search.slice(4) !== "") {
                id = history.location.search.slice(4);
            }

            let token = getCookie("token");

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };

            await fetch(`http://localhost:8088/quests/${props.id}/subquests`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setValuesSubQuests(result);
                })
                .catch(error => console.log('error', error));
        }
        fetchAllQuests();
    }, [history.location.search, props.id, valuesLastSubQuests]);

    return (
        <div className={classes.root}>
            <List dense="true" >
                <Typography variant="h4" component="h2" align="center">
                    {props.title}
                </Typography>
                {valuesSubQuests.map((item, count) => (
                    <ListItem key={count} >
                        <ExpansionPanel expanded={expanded === 'panel'+ (item.order+1)} onChange={handleChange('panel' +(item.order+1))} className={classes.bg} fullWidth>
                            <ExpansionPanelSummary
                                fullWidth
                                className={classes.list}
                                expandIcon={<Icon>expand_more</Icon>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>Quest №{item.order+1}</Typography>
                                <Typography className={classes.secondaryHeading}>{item.title}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {item.desc}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </ListItem>
                ))}
            </List>
            <AddSubQuest questId={props.id} refresh={() => refreshNew()} fullWidth/>
            <div className={classes.button} />
            <Divider />
        </div>
    );
}