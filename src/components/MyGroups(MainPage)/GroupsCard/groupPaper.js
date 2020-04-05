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
import { getCookie } from "../../../Cookie"
import ChangeGroupName from "./DialogChangeName"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {path} from "../../consts"

const useStyles = makeStyles(theme => ({
  area: {
    marginTop: theme.spacing(0),
    margin: theme.spacing(2),
    width: theme.spacing(52),
    // width: "100%",
    height: theme.spacing(7),
    [theme.breakpoints.down('xs')]: {
      // width: theme.spacing(30),
      width: "100%",
      marginLeft: theme.spacing(0)
      },
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
    marginLeft: theme.spacing(5),
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  action: {
    width: theme.spacing(62),
  },
  button:{
    marginLeft: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
      width:'15%',
      },
    // marginLeft: theme.spacing(-1),
  },
  button2:{
    marginLeft: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      width:'15%',
      },
  },
  color: {
    // background: theme.palette.secondary.main,
    width: "100%",
},
width:{
  width:'70%',
},
}));

export default function GroupPaper(props) {
  const classes = useStyles();

  let history = useHistory();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

//   window.onload = function(){
//     history.push("/groups");
//  }

  const handleClick = () => {
    if(matches){
      history.push("/group?id=" + props.id);
    }else{
      history.push("/groups?id=" + props.id);
    props.refresh();
    }
  }

  const handleGroupDelete = async () =>{

    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: myHeaders,
    };
    
   await fetch(`${path}groups/${props.id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      props.refresh();
  }

  return (
    <Grid container direction="row" className={classes.color}>
      <Grid item className={classes.width}>
      <Card className={classes.area} >
      <CardActionArea onClick={handleClick}>
        <Paper className={classes.paper}>
          <Grid container spacing={0}>
            <Grid item className={classes.margin}>
              <CardContent>
                <Avatar className={classes.purple}>{props.name[0]}</Avatar>
              </CardContent>
            </Grid>
            <Grid item className={classes.margin2} xs={9}>
              <CardContent>
                {/* Длина не больше 15 символов!*/}
                <Typography variant="h6" component="h2">
                  {props.name}
             </Typography>
              </CardContent>
            </Grid>
            <Grid item className={classes.icon}>
              <CardContent>
                <Icon color="inherit">people_alt</Icon>
              </CardContent>
            </Grid>
            {/* <Grid item className={classes.margin2}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  0/4
             </Typography>
              </CardContent>
            </Grid> */}
            <Grid item className={classes.margin3}>
            </Grid>
          </Grid>
        </Paper>
      </CardActionArea>
    </Card>
      </Grid>
      <Grid item className={classes.button}>
      <ChangeGroupName id={props.id} refresh={() => props.refresh()}/>
      </Grid>
      <Grid item className={classes.button2}>
      <IconButton aria-label="edit" onClick={() => handleGroupDelete()}>
          <Icon color="primary">delete</Icon>
        </IconButton>
      </Grid>
    </Grid>
  );
}