import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getLocalStorage } from '../../../Cookie';
import Skeleton from '@material-ui/lab/Skeleton';
import { Avatar } from '@material-ui/core';
import { path } from "../../consts";
import ScoreTable from "../Me/scoreTable"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        margin: theme.spacing(1),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(1),
    },
    skeleton: {
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
}));

export default function ExpandableParticipant(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [avatar, setAvatar] = React.useState(null);
    const [isAvatarLoading, setAvatarLoading] = React.useState(true);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const fetchAvatar = () => {
        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${path}participants/${props.id}/avatar`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
                    return;
                } else if (response.status === 500) {
                    console.log('No avatar for this group!');
                    setAvatarLoading(false);
                    return;
                }
                return response.blob();
            })
            .then(result => {
                if (result === undefined) {
                    return;
                } else {
                    setAvatar(URL.createObjectURL(result));
                    setAvatarLoading(false);
                }
            })
            .catch(error => console.log('error', error));
    }

    React.useEffect(()=>{
        fetchAvatar()
    },[]);

    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === 'panel' + props.index} onChange={handleChange('panel' + props.index)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                <Grid container direction="row">
                    <Grid item>
                    {(() => {
                        if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.skeleton} />);
                        else return (<Avatar alt={props.name} src={avatar}>{(props.name)[0]}</Avatar>)
                    })()}
                    </Grid>
                    <Grid item>
                    <Typography className={classes.heading}>{props.name}</Typography>
                    </Grid>
                </Grid>
                    <Typography className={classes.secondaryHeading}>{props.points}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <ScoreTable id={props.id}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}