import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Slide from '@material-ui/core/Slide';



const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper1: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    margin: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    root: {

        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {

            marginTop: theme.spacing(10),
            marginLeft: theme.spacing(70),
            width: theme.spacing(50),
            height: theme.spacing(70),
        },
    },

}));



export default function LoginUser() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: '',
        token: '',
        password: '',
        showPassword: false,
        showAlert: false,
        error: 'Token',
        disabled: false,
        login: false,
        titleEror: false,
        title: "Убедитесь, что вы правильно ввели почту или пароль",
    });

    const [checked, setChecked] = React.useState(false);

    const [button, setButton] = React.useState({
        label: 'SUBMIT',
        icon: 'group_add',
    });



    const handleSubmit = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/check/group?id=${values.token}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.exists) {
                    setChecked(prev => true);
                    setButton({ label: 'LOG IN', icon: 'how_to_reg' });
                    setValues({ ...values, showAlert: false, error: 'Token', disabled: true });
                } else {
                    setValues({ ...values, showAlert: true, error: 'Token has not found', disabled: false });
                }
            })
            .catch(error => console.log('error', error));


    };

    const handleSubmitFull = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "groupId" : values.token, "email": values.email, "password": values.password });

        var requestOptions1 = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/login/user", requestOptions1)
            .then(response => {
                response.text();
            })
            .then(result => {
                console.log(result);
                if(result === undefined){
                    console.log("!!@!@!@")
                    setValues({ ...values, titleEror: true });
                }
            })
            .catch(error => console.log('error', error));
    }

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
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="div" color="primary">
                        <Box fontSize="h4.fontSize" m={2}>
                            Log in
                        </Box>
                    </Typography>
                    <Typography component="div" color="secondary">
                        <Box fontSize="h7.fontSize" m={1}>
                            {values.titleEror ? values.title : " "}
                        </Box>
                    </Typography>
                    <TextField
                        disabled={values.disabled}
                        error={values.showAlert}
                        onChange={handleChange('token')}
                        value={values.token}
                        fullWidth
                        color="primary"
                        variant="outlined"
                        id="input-with-icon-textfield"
                        label={values.error}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon color="primary" fontSize="default">group</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit >
                        <div>
                            <TextField
                                className={classes.paper1}
                                fullWidth
                                value={values.email}
                                onChange={handleChange('email')}
                                color="primary"
                                variant="outlined"
                                id="email"
                                label="Email"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon color="primary" fontSize="default">email</Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FormControl className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
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
                        </div>



                    </Slide>
                </div>

                <Button
                    className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    href="#next"
                    startIcon={<Icon>{button.icon}</Icon>}
                    onClick={values.disabled ? handleSubmitFull : handleSubmit}
                >{button.label}</Button>

            </Container>
        </div>
    );
}