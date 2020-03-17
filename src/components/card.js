import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import GroupPaper from './groupPaper';
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import { getCookie } from "../Cookie"
import AddGroup from "./addGroup"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  [theme.breakpoints.down('sm')]: {
    root: {
      width: theme.spacing(75),
      height: theme.spacing(70),
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%',
      overflow: 'auto'
    },
  },
  [theme.breakpoints.up('md')]: {
    root: {
      width: theme.spacing(75),
      height: theme.spacing(70),
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%',
      overflow: 'auto'
    },
  },
  [theme.breakpoints.up('lg')]: {
    root: {
      position: "fixed",
      Top: 200,
      Left: 30,
      width: theme.spacing(75),
      height: theme.spacing(70),
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%',
      overflow: 'auto'
    },
  },
  text: {
    marginTop: theme.spacing(15)
  },
  refresh: {
    marginRight: theme.spacing(-65),
    marginTop: theme.spacing(-7)
  },
  addGroup: {
    marginBottom: theme.spacing(5),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();
  const [values, setValues] = useState([]);

  const [valuesLast, setValuesLast] = useState([]);

  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setValuesLast(values);
    console.log("refreshhhhhh.......");
  }

  window.onload = function () {
    refresh();
  }

  useEffect(() => {

    const fetchData = async () => {
      let token = getCookie("token");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      await fetch(`http://localhost:8088/owners/${getCookie("id")}/groups`, requestOptions)
        .then(response => response.json())
        .then(data => {
          // if (data === valuesLast) {
          //   console.log("======");
          //   return fetchData();
          // } else {
          console.log(data);
          setValues(data);
          setLoading(false)
          // setValuesLast({ "groups": data })
          // }
        })
        .catch(err => {
          setLoading(true)
          console.log(err)
        });
    }
    fetchData();
    // if(props.loading){
    //   return;
    // }else{
    //   fetchData();
    // }
  }, [valuesLast]);

  return (
    <Card className={classes.root}>
      <CardContent >
        <Typography variant="h6">
          Your groups:
        </Typography>
      </CardContent>
      <IconButton className={classes.refresh} aria-label="edit" onClick={refresh} style={{ "marginLeft": 0 }}>
        <Icon color="primary">cached</Icon>
      </IconButton>
      {/* {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
          <Typography>
            Try to refresh the page
          </Typography>
        </Backdrop>
      ) : ( */}
        <List>
        {values.map((item, count) => (
          <ListItem key={count} >
            <GroupPaper name={item.name} id={item.id} refresh={() => refresh()} />
          </ListItem>
        ))}
      </List>
        {/* )} */}
      <AddGroup onClick={() => refresh()} />
      <div className={classes.addGroup} />
    </Card>
  );
}