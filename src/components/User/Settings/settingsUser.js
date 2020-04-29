import React, { useState } from 'react';
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
import { getLocalStorage, setLocalStorage, deleteFromLocalStorage, clearLocalStorage } from "../../../Cookie"
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import PasswordConfirm from "../../Settings/passwordConfirm"
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { path } from "../../consts";
import Skeleton from '@material-ui/lab/Skeleton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Input from '@material-ui/core/Input';
import { strings } from "../../../localization"

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: `calc(100% + ${theme.spacing(1)}px)`,
    // maxHeight: `calc(100% + ${theme.spacing(30)}px)`,
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
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  avatarArea: {
    // marginLeft: theme.spacing(2),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarSkeleton: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  }
}));

export default function SittingsUser(props) {

  const [values, setValues] = useState({
    name: props.name,
    edit: false,
    email: props.email,
    password: "",
    password2: "",
    errorPassword: false,
    lang: getLocalStorage('lang'),
    showPassword: false,
    error: false,
    text: "",
    dis: "",
  });

  const [avatar, setAvatar] = useState(null);

  const [isAvatarLoading, setAvatarLoading] = useState(true);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

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

  const handleChangeLang = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    console.log(event.target.value);
    setLocalStorage("lang", event.target.value);
    document.location.reload();
  }

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

  const changeLanguage = (lang) => {
    strings.setLanguage(lang);
    handleClose();
  }

  const fetching = (ob, string) => {

    let token = getLocalStorage("token");

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

    fetch(`${path}participants/${getLocalStorage("id")}`, requestOptions)
      .then(response => {
        if (response.status > 400) {
          console.log("Authorization error");
          enqueueSnackbar(strings.authorizationError, {
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
          setLocalStorage("name", result.name, 30);
          setLocalStorage("email", result.email, 30);
          enqueueSnackbar(string, {
            variant: 'success',
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleClick = () => {

    let ob = {}

    let error = false;

    if (values.name !== props.name) {

      ob.name = values.name;

      fetching(ob, strings.nameReset);
    }
    if (values.password !== "" && values.password2 !== "") {
      if (values.password.length < 5) {
        console.log("Password should be more the 5 simbols!");
        enqueueSnackbar(strings.longerPasswd, {
          variant: 'error',
        });
        setValues({ ...values, errorPassword: true });
        error = true;
      } else {
        setValues({ ...values, errorPassword: false });
      }
      if (values.password !== values.password2) {
        console.log("Passwords should be equal!");
        enqueueSnackbar(strings.passwdMissmatch, {
          variant: 'error',
        });
        setValues({ ...values, errorPassword: true });
        error = true;
      } else {
        setValues({ ...values, errorPassword: false });
      }

      if (!error) {
        fetching({ "password": values.password }, strings.resetPasswd);
        // document.location.reload()
      }
    }
    if (values.email !== props.email) {
      handleClickOpen();
    }
  }

  const fetchAvatar = () => {
    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${path}participants/${getLocalStorage("id")}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar(strings.authorizationError, {
            variant: 'error',
          });
          return;
        } else if (response.status === 500) {
          console.log('No avatar for this user!');
          setAvatarLoading(false);
          return;
        }
        return response.blob();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          setAvatar(URL.createObjectURL(result));
          setAvatarLoading(false);
        }
      })
      .catch(error => console.log('error', error));
  }

  const uploadAvatar = (e) => {
    let token = getLocalStorage("token");

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

    setAvatarLoading(true);

    fetch(`${path}participants/${getLocalStorage("id")}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar(strings.authorizationError, {
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
          enqueueSnackbar(strings.resetAvatar, {
            variant: 'success'
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  const logout = () => {
    clearLocalStorage();
    // history.push("/login/user")
    document.location.reload();
  }

  React.useEffect(() => {
    fetchAvatar();
  }, []);


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
                  {(() => {
                    if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.avatarSkeleton} />);
                    else return (<Avatar alt={getLocalStorage("name")} src={avatar} className={classes.avatar}>{getLocalStorage("name").charAt(0)}</Avatar>)
                  })()}
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
                label={strings.name}
                defaultValue="имя"
                value={values.name}
                onChange={handleChange("name")}
              />
            </Grid>

            <Grid item className={classes.area}>

              <FormControl error={values.error} fullWidth>
                <InputLabel htmlFor="component-error">{strings.eMail}</InputLabel>
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
                <InputLabel htmlFor="standard-adornment-password">{strings.newPasswd}</InputLabel>
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
                <InputLabel htmlFor="standard-adornment-password">{strings.repeatNewPasswd}</InputLabel>
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
                  {strings.generalSettings}
                </Box>
              </Typography>
            </Grid>
            {/* <Divider /> */}
            <Grid item className={classes.area}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-simple-select-label">{strings.language}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue="Russian"
                  value={values.lang}
                  onChange={handleChangeLang("lang")}
                >
                  <MenuItem value={"ru"} onClick={() => changeLanguage('ru')}>Russian</MenuItem>
                  <MenuItem value={"en"} onClick={() => changeLanguage('en')}>English</MenuItem>
                  <MenuItem value={"ua"} onClick={() => changeLanguage('ua')}>Ukrainian</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button onClick={handleClick} variant="contained" color="primary">{strings.SAVE_CHANGES}</Button>
            </Grid>
            <Grid item style={{ alignSelf: "center" }}>
              <Button onClick={logout} color="primary" variant="outlined" endIcon={<Icon>logout</Icon>}>{strings.LOG_OUT}</Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <PasswordConfirm open={open} onClick={handleClose} onClose={handleClose} name={values.name} email={values.email} user={true} owner={false} />
    </main>
  );
}