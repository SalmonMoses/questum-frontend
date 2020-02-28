import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Icon } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  area: {
    marginTop: theme.spacing(0),
    margin: theme.spacing(2),
    width: theme.spacing(66),
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
    margin: theme.spacing(-0.5, -1),
    // backgroundColor: theme.palette.primary.main,
  },
  margin3: {
    margin: theme.spacing(-1.5, -2),
    // backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginLeft: theme.spacing(19),
  },
  paper:{
    backgroundColor: theme.palette.background.default,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  action:{
    width:theme.spacing(62),
  },
}));

export default function GroupPaper() {
  const classes = useStyles();

  let history = useHistory();

  const handleClick = () =>{
    history.push("/group/id");
  }

  return (
      <Card className={classes.area}>
        <CardActionArea onClick={handleClick}>
          <Paper className={classes.paper}>
            <Grid container spacing={0} >
              <Grid item className={classes.margin}>
                <CardContent>
                  <Avatar className={classes.purple}>N</Avatar>
                </CardContent>
              </Grid>
              <Grid item className={classes.margin2} xs={4}>
                <CardContent>
                {/* Длина не больше 15 символов!*/}
                  <Typography gutterBottom variant="h5" component="h2">
                    GroupName
             </Typography>
                </CardContent>
              </Grid>
              <Grid item className={classes.icon}>
                <CardContent>
                  <Icon color="inherit">people_alt</Icon>
                </CardContent>
              </Grid>
              <Grid item className={classes.margin2}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    0/4
             </Typography>
                </CardContent>
              </Grid>
              <Grid item className={classes.margin3}>
                <CardContent>
                  <IconButton aria-label="edit">
                    <Icon color="inherit">edit</Icon>
                  </IconButton>
                </CardContent>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
      </Card>
  );
}