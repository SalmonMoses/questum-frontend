import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { OutlinedInput } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { setLocalStorage } from "./Cookie";
import { path } from "./components/consts"
import { strings } from './localization'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="#">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    width: '100%',
  },
  input: {
    width: '100%',
  },
  margin: {
    margin: theme.spacing(0),
    width: '100%',
  },
  icons: {
    margin: theme.spacing(2, 0, 2)
  },
  icons2: {
    margin: theme.spacing(2, 0, 1)
  },
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  logo: {
    marginBottom: theme.spacing(2)
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    token: '',
    password: '',
    showAlert: false,
    showPassword: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  let history = useHistory();

  const login = async () => {
    console.log(values.email + " " + values.password)

    await fetch(`${path}login/owner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      }),
    })
      .then(res => {
        if (res.status === 401) {
          console.log("Authorization error")
          enqueueSnackbar(strings.correctEmailPasswd, {
            variant: 'error',
          });
          return;
        }
        return res.json();
      })
      .then(json => {
        if (json === undefined) {
          return;
        } else {
          console.dir(json.refreshToken);
          setLocalStorage("refreshToken", json.refreshToken, 10);
          setLocalStorage("token", json.token, 30);
          console.dir(document.cookie);
          setValues({ ...values, showAlert: false });
          enqueueSnackbar(strings.loggedIn + json.owner.name, {
            variant: 'success',
          });
          history.push('/');
        }
      })
      .catch(console.log);
  }

  document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        login();
    }
    return true;
}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img alt="Questerium" src={`${process.env.PUBLIC_URL}/Qlogo.png`} class={classes.logo} />
        <Typography component="div" color="primary">
          <Box fontSize="h3.fontSize" m={1}>
            {strings.signIn}
       </Box>
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={1} alignItems="flex-end">
            {/* <Grid item className={classes.icons}>
              <Icon color="primary">account_circle</Icon>
            </Grid> */}
            <Grid item className={classes.input}>
              <TextField
                onChange={handleChange('email')}
                value={values.email}
                error={values.showAlert}
                variant="outlined"
                id="e-mail"
                label={strings.eMail}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon color="primary" fontSize="default">email</Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>


          <Grid container spacing={1} alignItems="flex-end">
            {/* <Grid item className={classes.icons2}>
              <Icon color="primary" >lock</Icon>
            </Grid> */}
            <Grid item className={classes.input}>
              <FormControl className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{strings.passwd}</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  error={values.showAlert}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Icon color="primary">visibility</Icon> : <Icon color="primary">visibility_off</Icon>}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type="button"
            variant="contained"
            fullWidth
            color="primary"
            onClick={login}
          >{strings.SIGN_IN}</Button>
          <Typography component='div' className={classes.submit}>
            <Box textAlign="center" fontSize="h7.fontSize" m={0}>
              <Link href="#" color="primary">
                {strings.forgorPasswd}
             </Link>
            </Box>
            <Box textAlign="center" fontSize="h7.fontSize" m={1}>
              <Link href="/signup/owner" color="primary" >
                {strings.noGroupCreaterAcc}
             </Link>
            </Box>
            <Box textAlign="center" fontSize="h7.fontSize" m={1}>
              <Link href="/login/user" color="primary" >
                {strings.signInAsParticipant}
             </Link>
            </Box>
            <Box textAlign="center" fontSize="h7.fontSize" m={1}>
              <Link href="/owner/restore-password" color="primary" >
                {"Забыли пароль?"}
             </Link>
            </Box>
          </Typography>

        </form>
      </div>
    </Container>

  );
}