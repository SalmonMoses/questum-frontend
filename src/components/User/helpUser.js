import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage} from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { strings } from "../../localization"

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: theme.spacing(100),
    marginTop: theme.spacing(0),
    [theme.breakpoints.up('xs')]: {
      paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(4),
  },
    // paddingRight: theme.spacing(4),
    // paddingTop: theme.spacing(3)
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
  },
  [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
  },
  [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
  },
  },
  area: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(40),
  },
  area1: {
    width: theme.spacing(37),
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  area3: {
    height: theme.spacing(10)
  }
}));

export default function Help() {

  let history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  let cookie = getLocalStorage("refreshToken");

  if (cookie === undefined) {
    history.push("/login/owner");
    enqueueSnackbar(strings.sessionTimeout, {
      variant: 'error',
    });
  }

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>
        <Typography variant="h2">
            {strings.helpPage}
        </Typography>
        <Divider />
        </Container>
      </Paper>
    </main>
  );
}