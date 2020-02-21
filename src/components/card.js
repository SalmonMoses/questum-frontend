import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GroupPaper from './groupPaper';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(75),
    height: theme.spacing(70),
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text:{
    marginTop: theme.spacing(30)

  },
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised="true" >
     <CardContent >
        <Typography variant="h6">
          Your groups:
        </Typography>
      </CardContent>
    <GroupPaper />
    <GroupPaper />
    <GroupPaper />
    <GroupPaper />
      {/* <CardContent className={classes.text}>
        <Typography variant="h4">
          You have no groups yet
        </Typography>
      </CardContent> */}
    </Card>
  );
}