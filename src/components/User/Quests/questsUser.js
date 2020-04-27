import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage } from "../../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { path } from "../../consts"
import SubquestStepper from './Subquests/subquestStepper';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: `calc(100% + ${theme.spacing(1)}px)`,
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
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(2),
    },
  },
}));

export default function QuestsUser() {

  let history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  //Проверка на наличие refreshToken
  let cookie = getLocalStorage("refreshToken");

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

      let id = getLocalStorage("groupID");
      console.log("Cookie id: " + id);

      let token = getLocalStorage("token");
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
  }, []);





  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>


          {valuesQuests.map((item, count) => (
            
              <SubquestStepper id={item.id} title={item.title} desc={item.desc} count={count}/> 

          ))}



        </Container>
      </Paper>
    </main>
  );
}