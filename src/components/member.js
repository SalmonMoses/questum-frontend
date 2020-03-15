import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { getCookie } from "../Cookie"
import CardActionArea from '@material-ui/core/CardActionArea';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: theme.spacing(70),
        height: theme.spacing(70),
        backgroundColor: theme.palette.background.default,
    },
    media: {
        height: 140,
    },
    area: {
        marginTop: theme.spacing(0),
        margin: theme.spacing(2),
        width: theme.spacing(62),
        height: theme.spacing(7),
    },
    area2: {
        maxWidth: theme.spacing(66),
        maxHeight: theme.spacing(7),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    margin: {
        margin: theme.spacing(-1),
    },
    margin2: {
        margin: theme.spacing(-1.5, -1),
    },
    margin3: {
        margin: theme.spacing(-1.5, -2),
    },
    score: {
        margin: theme.spacing(-0.5, -1),
        marginLeft: theme.spacing(19),
    },
    email: {
        marginTop: theme.spacing(-2),
    },
    paper: {
        backgroundColor: theme.palette.background.default,
    },
}));

export default function MemberPaper(props) {
    const classes = useStyles();

    const handleMemberDelete = async () =>{

        let token = getCookie("token");
    
        var myHeaders = new Headers();
    
        myHeaders.append("Content-Type", "application/json");
    
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: myHeaders,
          };
          
          await fetch(`http://localhost:8080/participants/${props.id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    
          props.refresh();
      }

      const handleClick = () =>{
          props.onClick();
      }

    return (
        <Card className={classes.area}>
         <CardActionArea onClick={handleClick}>
            <Paper className={classes.paper}>
                <Grid container spacing={0} >
                    <Grid item className={classes.margin}>
                        <CardContent>
                            <Avatar className={classes.orange}>N</Avatar>
                        </CardContent>
                    </Grid>
                    <Grid item className={classes.margin2} xs={6}>
                        <CardContent>
                            {/* Длина не больше 15 символов!*/}
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.name}
                            </Typography>
                            <div className={classes.email}>
                                <Typography gutterBottom variant="h7" component="h7" >
                                    {props.email}
                                </Typography>
                            </div>
                        </CardContent>
                    </Grid>
                    <Divider orientation="vertical" />
                    <Grid item className={classes.score}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {props.points}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="edit" onClick={() => handleMemberDelete()}>
                            <Icon color="primary">delete</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
            </CardActionArea>
        </Card>
    );
}