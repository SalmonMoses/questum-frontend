import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import { getCookie } from "../../../../Cookie"
import { path } from "../../../consts"
import { useSnackbar } from 'notistack';
import { InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    area: {
        width: "100%",
    },
    chip: {
        marginLeft: theme.spacing(1),
    },
    button: {
        width: theme.spacing(59),
    },
    width: {
        width: `calc(100% + ${theme.spacing(2)}px)`,
    },
}));



export default function SubmitAnswer(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState({
        answer: "",
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { enqueueSnackbar } = useSnackbar();

    const sendAnswer = async () => {
        var myHeaders = new Headers();
        let token = getCookie("token");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({ "subquestId": props.subquestId, "answer": values.answer });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${path}groups/${props.groupId}/submit`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    enqueueSnackbar(`Что-то не так...`, {
                        variant: 'error',
                    });
                    return;
                }
                return response.json()
            })
            .then(result => {
                if (result === undefined) {
                    return;
                }
                enqueueSnackbar(`Ваш ответ отправился на обработку!`, {
                    variant: 'success',
                });
                console.log(result)
            })
            .catch(error => console.log('error', error));
        handleClose();
    }

    return (
        <div>
            <InputLabel htmlFor="answer-text-field">Answer</InputLabel>
            <Input
                required
                id="answer-text-field"
                type='text'
                value={values.answer}
                onChange={handleChange('answer')}
                endAdornment={
                    <InputAdornment position="end" disabled={values.answer === ''}>
                        <IconButton
                            aria-label="send an answer"
                            onClick={sendAnswer}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <SendIcon></SendIcon>
                        </IconButton>
                    </InputAdornment>
                }
            />
        </div>
    );
}