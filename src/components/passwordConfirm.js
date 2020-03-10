import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import { getCookie, setCookie } from "../Cookie"
import { useSnackbar } from 'notistack';

function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
}

export default function PasswordConfirm(props) {

    const [values, setValues] = React.useState({
        password: '',
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

    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {

        let token = getCookie("token");

        let ob = {
            email: props.email,
        }

        var myHeaders2 = new Headers();

        myHeaders2.append("Content-Type", "application/json");

        myHeaders2.append("Authorization", "Bearer " + token);

        var requestOptions2 = {
            method: 'GET',
            headers: myHeaders2,
            // body: raw2,
            redirect: 'follow'
        };

        console.log(values.password + getCookie("email"));

        // fetch(`http://localhost:8088/check/password?hash=${sha512(values.password + props.email)}`, requestOptions2)
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result)
        //         if (result.correct === false) {
        //             enqueueSnackbar("Пароль введен неправильно", {
        //                 variant: 'error',
        //             });
        //             console.log("Password Error");
        //         }
        //         else {
        //             console.log("pass is right");
        //             ob.password = values.password;
        //             console.dir(ob);
        //             /////////////////////////////////////////////////////////////////////////
        //             //фетч в фетче чтоб избежать ассинхронности
        //             var raw = JSON.stringify(ob);

        //             var requestOptions = {
        //                 method: 'PUT',
        //                 headers: myHeaders2,
        //                 body: raw,
        //                 redirect: 'follow',

        //             };

        //             fetch(`http://localhost:8088/owners/${getCookie("id")}`, requestOptions)
        //                 .then(response => {
        //                     if (response.status === 401) {
        //                         console.log("Authorization error");
        //                         // alert("Время сессии истекло, войдите заново.");
        //                         // history.push("/login/owner");
        //                         enqueueSnackbar("Ошибка обработки изменений :(", {
        //                             variant: 'error',
        //                         });
        //                         return;
        //                     }
        //                     return response.json();
        //                 })
        //                 .then(result => {
        //                     if (result === undefined) {
        //                         return;
        //                     } else {
        //                         console.log(result);
        //                         setCookie("name", result.name, 30);
        //                         setCookie("email", result.email, 30);
        //                         enqueueSnackbar("Данные успешно изменены", {
        //                             variant: 'success',
        //                         });
        //                         console.log(sha512(values.password + values.email));
        //                         props.onClick();
        //                     }
        //                 })
        //                 .catch(error => console.log('error', error));
        //             /////////////////////////////////////////////////////////////////////////
        //         }
        //     })
        //     .catch(error => console.log('error', error));
        //     console.dir(ob);

        sha512(values.password + getCookie("email")).then(value => {
            // console.log("sha1: " + sha512(values.password + getCookie("email")));
            // console.log("sha2: " + value);
            fetch(`http://localhost:8088/check/password?hash=${value}`, requestOptions2)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.correct === false) {
                    enqueueSnackbar("Пароль введен неправильно", {
                        variant: 'error',
                    });
                    console.log("Password Error");
                }
                else {
                    console.log("pass is right");
                    ob.password = values.password;
                    console.dir(ob);
                    /////////////////////////////////////////////////////////////////////////
                    //фетч в фетче чтоб избежать ассинхронности
                    var raw = JSON.stringify(ob);

                    var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders2,
                        body: raw,
                        redirect: 'follow',

                    };

                    fetch(`http://localhost:8088/owners/${getCookie("id")}`, requestOptions)
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
                                enqueueSnackbar("Данные успешно изменены", {
                                    variant: 'success',
                                });
                                console.log(sha512(values.password + values.email));
                                props.onClick();
                                document.location.reload();
                            }
                        })
                        .catch(error => console.log('error', error));
                    /////////////////////////////////////////////////////////////////////////
                }
            })
            .catch(error => console.log('error', error));
            console.dir(ob);
        })
    }



    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To change email you should enter your password
          </DialogContentText>
                    <FormControl fullWidth >
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClick} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}