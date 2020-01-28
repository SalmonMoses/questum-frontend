import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(30),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main, // пример использования темы
    color: theme.palette.primary.contrastText
  },
  input: {
    width: '90%',
  },
  margin: {
    margin: theme.spacing(0),
    width: '100%',
  },
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="div">
          <Box fontSize="h3.fontSize" m={1}>
            Sign In
       </Box>
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Icon>account_circle</Icon>
            </Grid>
            <Grid item className={classes.input}>
              <TextField
                id="e-mail"
                label="E-mail"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>


          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Icon>lock</Icon>
            </Grid>
            <Grid item className={classes.input}>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  fullWidth
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
                        {values.showPassword ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            fullWidth
            // backgroundColor="inherit"
          >Sign In</Button>
          <Typography component='div'>
            <Box textAlign="center" fontSize="h7.fontSize" m={0}>
              <Link href="#" color="inherit" onClick={event => event.preventDefault()}>
                Forgot password?
             </Link>
            </Box>
          </Typography>

        </form>
      </div>
    </Container>

  );
}
