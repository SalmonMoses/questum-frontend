import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getCookie} from "../../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Quests from "../../MyGroups(MainPage)/Tabs/Quests/quests"
import {path} from "../../consts"
import QuestCard from "./questCard"

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: theme.spacing(100),
    marginTop: theme.spacing(0),
    [theme.breakpoints.up('xs')]: { // xs - телефон
      paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('sm')]: {  // sm md lg - планшеты - компы.
      paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(4),
  },
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
}));

export default function QuestsUser() {

  let history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  //Проверка на наличие refreshToken
  let cookie = getCookie("refreshToken");

  if (cookie === undefined) {
    history.push("/login/user");
    enqueueSnackbar("Время сессии истекло, войдите заново.", {
      variant: 'error',
    });
  }
 ////////////////////////////////////

  const classes = useStyles();

  const [valuesQuests, setValuesQuests] = useState([]);

useEffect(() => {

    const fetchDataQuests = async () => {

        let id = getCookie("groupID");
        console.log("Cookie id: " + id);
        // if (history.location.search.slice(4) !== "") {
        //   id = history.location.search.slice(4);
        // }
        // console.log("ID: " + id);
    
    
        let token = getCookie("token");
        var myHeaders = new Headers();
        
        myHeaders.append("Authorization", "Bearer " + token);
    
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders,
        };
    
        await fetch(`${path}groups/${id}/quests`, requestOptions)
          .then(response => {
            if (response.status === 400) {
              return undefined;
            } else {
              return response.json();
            }
          })
          .then(result => {
            if (result === undefined) {
              console.log("error ")
            } else {
              console.log(result);
              setValuesQuests(result);
            }
          })
          .catch(error => console.log('error', error));
      }
      fetchDataQuests();
},[]);

 



  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>
         

        <List className={classes.width}>
              {valuesQuests.map((item, count) => (
              <ListItem key={count}>
                <QuestCard title={item.title} questId={item.id} />
              </ListItem>
            ))}
              </List>



        </Container>
      </Paper>
    </main>
  );
}