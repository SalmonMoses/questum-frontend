import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Icon } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: theme.spacing(70),
    height: theme.spacing(70),
    backgroundColor: theme.palette.primary.main,
  },
  media: {
    height: 140,
  },
  area: {
    marginTop: theme.spacing(0),
    margin: theme.spacing(2),
    maxWidth: theme.spacing(66),
    maxHeight: theme.spacing(7),
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
  },
  margin3: {
    margin: theme.spacing(-1.5, -2),
  },
  icon: {
    marginLeft: theme.spacing(27),
  },
  paper:{
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function GroupPaper() {
  const classes = useStyles();

  return (
      <Card className={classes.area}>
        <CardActionArea  >
          <Paper className={classes.paper}>
            <Grid container spacing={0} >
              <Grid item className={classes.margin}>
                <CardContent>
                  <Avatar className={classes.orange}>N</Avatar>
                </CardContent>
              </Grid>
              <Grid item className={classes.margin2}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
             </Typography>
                </CardContent>
              </Grid>
              <Grid item className={classes.icon}>
                <CardContent>
                  <Icon color="secondary">people_alt</Icon>
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
                    <Icon color="secondary">edit</Icon>
                  </IconButton>
                </CardContent>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
      </Card>
  );
}