import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getCookie} from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

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

export default function Help() {

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

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>
         {/* здесь пиши код страницы 
         Чтоб все корректно отображалось нужно использовать размены елементов в процентах
         width: "100%" - в контейнерах и компонентах
         либо fullWidth
         статически никогда не указый размер!!
         Должно быть так, чтоб когда ты менял утсройсво(с 7 айфона на 7+ например)
         все так же отображалась как и задумывалось
         */}
        </Container>
      </Paper>
    </main>
  );
}