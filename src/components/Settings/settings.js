import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { getCookie, setCookie } from "../../Cookie"
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import PasswordConfirm from "./passwordConfirm"
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { path } from "../consts";

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: theme.spacing(100),
    marginTop: theme.spacing(2),
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
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  avatarArea: {
    marginLeft: theme.spacing(2),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconButton: {
    margin: theme.spacing(1)
  },
}));

export default function Sittings(props) {

  const [values, setValues] = useState({
    name: props.name,
    edit: false,
    email: props.email,
    password: "",
    password2: "",
    errorPassword: false,
    lang: "Russian",
    showPassword: false,
    error: false,
    text: "",
    dis: "",
  });

  const [avatar, setAvatar] = useState(null);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  let history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  let cookie = getCookie("refreshToken");

  if (cookie === undefined) {
    history.push("/login/owner");
    enqueueSnackbar("Время сессии истекло, войдите заново.", {
      variant: 'error',
    });
  }

  const classes = useStyles();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetching = (ob, string) => {

    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify(ob);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',

    };

    fetch(`${path}owners/${getCookie("id")}`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
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
          enqueueSnackbar(string, {
            variant: 'success',
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  const fetchAvatar = () => {
    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${path}owners/${getCookie("id")}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar("Ошибка обработки изменений :(", {
            variant: 'error',
          });
          return;
        }
        return response.blob();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          setAvatar(URL.createObjectURL(result));
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleClick = () => {

    let ob = {}

    let error = false;

    if (values.name !== props.name) {

      ob.name = values.name;

      fetching(ob, "Имя успешно изменено");
    }
    if (values.password !== "" && values.password2 !== "") {
      if (values.password.length < 5) {
        console.log("Password should be more the 5 simbols!");
        enqueueSnackbar("Пароль должен быть длинее 5 символов!", {
          variant: 'error',
        });
        setValues({ ...values, errorPassword: true });
        error = true;
      } else {
        setValues({ ...values, errorPassword: false });
      }
      if (values.password !== values.password2) {
        console.log("Passwords should be equal!");
        enqueueSnackbar("Пароли не совпадают", {
          variant: 'error',
        });
        setValues({ ...values, errorPassword: true });
        error = true;
      } else {
        setValues({ ...values, errorPassword: false });
      }

      if (!error) {
        fetching({ "password": values.password }, "Пароль успешно изменен");
        // document.location.reload()
      }
    }
    if (values.email !== props.email) {
      handleClickOpen();
    }
  }

  const uploadAvatar = (e) => {
    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    let avatar = new FormData();
    avatar.append('avatar', e.target.files[0])

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: avatar
    };

    fetch(`${path}owners/${getCookie("id")}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar("Ошибка обработки изменений :(", {
            variant: 'error',
          });
          return;
        }
        return response.blob();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          fetchAvatar();
          enqueueSnackbar('Аватар успешно обновлен (может понадобиться обновление страницы)', {
            variant: 'success'
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchAvatar();
  });

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

            <Grid item className={classes.avatarArea}>
              <Grid container spacing={2} direction="column" className={classes.avatarArea}>
                <Grid item>
                  <Avatar alt={getCookie("name")} src={avatar} className={classes.avatar}>{getCookie("name").charAt(0)}</Avatar>
                </Grid>
                <Grid item>
                  <Input
                    style={{ display: 'none' }}
                    id="avatar-file-input"
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar} />
                  <label htmlFor="avatar-file-input">
                    <Button variant="contained" color="primary" className={classes.iconButton} component="span" startIcon={<CloudUploadIcon />}>Change avatar</Button>
                  </label>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.area}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Name"
                defaultValue="имя"
                value={values.name}
                onChange={handleChange("name")}
              />
            </Grid>

            <Grid item className={classes.area}>

              <FormControl error={values.error} fullWidth>
                <InputLabel htmlFor="component-error">Email</InputLabel>
                <Input
                  id="component-error"
                  value={values.email}
                  onChange={handleChange("email")}
                  aria-describedby="component-error-text"
                />
                <FormHelperText id="component-error-text">{values.text}</FormHelperText>
              </FormControl>
            </Grid>
            <Divider />
            <Grid item className={classes.area}>
              <FormControl fullWidth disabled={values.dis}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  error={values.errorPassword}
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Icon color="primary">visibility</Icon> : <Icon color="primary">visibility_off</Icon>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item className={classes.area}>
              <FormControl fullWidth disabled={values.dis}>
                <InputLabel htmlFor="standard-adornment-password">Repeat Password</InputLabel>
                <Input
                  error={values.errorPassword}
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password2}
                  onChange={handleChange('password2')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Icon color="primary">visibility</Icon> : <Icon color="primary">visibility_off</Icon>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
      <PasswordConfirm open={open} onClick={handleClose} onClose={handleClose} name={values.name} email={values.email} user={true} owner={false} />
    </main>
  );
}