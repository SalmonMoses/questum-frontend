import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { getCookie, deleteCookie, setCookie } from "../Cookie"
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

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

// async function check() {

//   let cookie = getCookie("refreshToken");
//   var myHeaders = new Headers();

//   myHeaders.append("Content-Type", "application/json");

//   // alert(cookie);

//   var raw = JSON.stringify({ "refreshToken": cookie });

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   let response = await fetch("http://localhost:8080/login/owner", requestOptions);
//   if (response.status === 401) {
//     console.log("Authorization error");
//     alert("Время сессии истекло, войдите заново.");
//     // history.push("/login/owner");
//     // enqueueSnackbar("Время сессии истекло, войдите заново.", {
//     //     variant: 'error',
//     // });
//     return;
//   }
//   const json = await response.json();

//   if (json === undefined) {
//     console.log("json = undefined");
//     return;
//   } else {
//     console.dir(json.refreshToken + 'SUCCES');
//     setCookie("refreshToken", json.refreshToken, 10);
//     console.dir(json.owner.name + " " + json.owner.email);
//     // setValues({ ...values, "name": json.owner.name, "email":json.owner.email })
//     alert(document.cookie + ` Вы вошли как ${json.owner.name}`);
//     // enqueueSnackbar(`Вы вошли как ${json.owner.name}`, {
//     //   variant: 'success',
//     // });
//   }
//   return json.owner.name;
// }

// async function check() {

//   let cookie = getCookie("refreshToken");

//   // if(cookie === undefined){
//   //     history.push("/login/owner");
//   //     enqueueSnackbar("Время сессии истекло, войдите заново.", {
//   //       variant: 'error',
//   //     });
//   // }

//   console.dir(document.cookie);

//   var myHeaders = new Headers();

//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({ "refreshToken": cookie });

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   let response = await fetch("http://localhost:8080/login/owner", requestOptions);
//   if (response.status === 401) {
//     console.log("Authorization error");
//     // alert("Время сессии истекло, войдите заново.");
//     // history.push("/login/owner");
//     // enqueueSnackbar("Время сессии истекло, войдите заново.", {
//     //   variant: 'error',
//     // });
//     return;
//   }
//   let result = await response.json();
//   if (result === undefined) {
//     return;
//   } else {
//     console.dir(result.refreshToken + 'SUCCES');
//     setCookie("refreshToken", result.refreshToken, 10);
//     // setCookie("id", result.owner.id, 10);
//     // alert(document.cookie + ` Вы вошли как ${json.owner.name}`);
//     // enqueueSnackbar(document.cookie, {
//     //   variant: 'success',
//     // });
//   }
//   return result;
// }

export default function Sittings(props) {

  // let name = check();

  // console.dir(name);

  const [values, setValues] = useState({
    name: props.name,
    edit: false,
    email: props.email,
    // emailEdit: false,
    password: "*************",
    lang: "Russian",
    // passEdit: false,
  });


  let history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  let cookie = getCookie("refreshToken");

  if (cookie === undefined) {
    history.push("/login/owner");
    enqueueSnackbar("Время сессии истекло, войдите заново.", {
      variant: 'error',
    });
  }


  // let id = getCookie("id");

  // var requestOptions = {
  //   method: 'GET',
  //   redirect: 'follow',
  //   mode: 'no-cors',
  // };

  // fetch(`http://localhost:8080/owners/${id}`, requestOptions)
  //   .then(response => response.json())
  //   .then(result => console.dir(result))
  //   .catch(error => console.log('error', error));


  const classes = useStyles();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClick = () => {

    let token = getCookie("refreshToken");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json", "Authorization", "Bearer " + token);

    var raw = JSON.stringify({ "name": props.name, "email": props.email, "password": props.password });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`http://localhost:8080/owners/${getCookie("id")}`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          // alert("Время сессии истекло, войдите заново.");
          // history.push("/login/owner");
          enqueueSnackbar("Ошибка обработки изменений :(", {
            variant: 'error',
          });
          return;
        }
        return response.json();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          console.log(result);
          setCookie("name", result.name, 30);
          setCookie("email", result.email, 30);
        }
      })
      .catch(error => console.log('error', error));
  }


  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>

          <Grid container spacing={4} direction="column">
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
                defaultValue={values.password} />
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
            <Grid item>
              <Button onClick={handleClick} variant="contained" color="primary">Save changes</Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </main>
  );
}