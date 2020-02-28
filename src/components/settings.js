import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { useHistory } from "react-router-dom";
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  paper: {
    height: theme.spacing(100),
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(4),
    // paddingTop: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  cont: {
    marginLeft: theme.spacing(2),
    // background: theme.palette.primary.main,
  },
  area: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(40),
  },
  area1: {
    width: theme.spacing(70),
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  area3: {
    height: theme.spacing(10)
  }
}));

export default function Sittings() {

  const [values, setValues] = useState({
    name: "name",
    edit: false,
    email: "email",
    // emailEdit: false,
    password: "password",
    lang: "Russian",
    // passEdit: false,
  });

  // const [lang, setlang] = useState('rus');

  const classes = useStyles();

  const handleClick = () => {
    setValues({ ...values, edit: true })
  }


  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }


  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>

          <Grid container spacing={4} direction="column">
            {/* <Grid container spacing={3} direction="row">
          <Grid item className={classes.area3}>
              
            </Grid>
          <Grid item >
              <Typography >
                <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium" >
                  Account settings
                </Box>
              </Typography>
            </Grid>
            <Grid item >
            <IconButton aria-label="edit">
                <Icon color="inherit">edit</Icon>
              </IconButton>
            </Grid>
          </Grid> */}
            <Grid item className={classes.area1}>
              <Typography color="primary">
                <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium" >
                  Account settings
                </Box>
              </Typography>
            </Grid>
            <Divider />


            <Grid item className={classes.area}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Name"
                defaultValue="имя"
                value={values.name} />
              {/* <IconButton aria-label="edit">
                <Icon color="inherit">edit</Icon>
              </IconButton> */}
            </Grid>

            <Grid item className={classes.area}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="E-Mail"
                defaultValue="почта"
                value={values.email} />
              {/* <IconButton aria-label="edit">
                <Icon color="inherit">edit</Icon>
              </IconButton> */}
            </Grid>

            <Grid item className={classes.area}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Password"
                defaultValue="пароль" />
            </Grid>

            <Divider />

            <Grid item className={classes.area1}>
              <Typography color="primary">
                <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium" >
                  General settings
                </Box>
              </Typography>
            </Grid>
            <Divider />
            <Grid item className={classes.area}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue="Russian"
                  value={values.lang}
                  onChange={handleChange("lang")}
                >
                  <MenuItem value={"Russian"}>Russian</MenuItem>
                  <MenuItem value={"English"}>English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </main>
  );
}