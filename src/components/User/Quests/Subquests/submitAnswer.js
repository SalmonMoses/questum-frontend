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
import { getLocalStorage } from "../../../../Cookie"
import { path } from "../../../consts"
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SendIcon from '@material-ui/icons/Send';
import { strings } from "../../../../localization"

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

    const sendAnswer = async () =>{
        var myHeaders = new Headers();
        let token = getLocalStorage("token");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        
        var raw = JSON.stringify({"subquestId": props.subquestId, "answer": values.answer});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
       await fetch(`${path}groups/${props.groupId}/submit`, requestOptions)
          .then(response => {
              if(response.status === 401){
                enqueueSnackbar(strings.smthWrong, {
                    variant: 'error',
                });
                return;
              }
              return response.json()})
          .then(result =>{
              if(result === undefined){
                return;
              }
            enqueueSnackbar(strings.answerProcess, {
                variant: 'success',
            });
          console.log(result)})
          .catch(error => console.log('error', error));
          handleClose();
          props.refresh();
    }

    return (
        <div>
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">{strings.answer}</InputLabel>
          <Input
            disabled={props.disabled}
            id="standard-adornment-password"
            value={values.answer}
            onChange={handleChange('answer')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={sendAnswer}
                  onMouseDown
                  disabled={values.answer === ""}
                >
                  {<SendIcon></SendIcon>}
                </IconButton>
              </InputAdornment>
            }
          />
          {props.disabled ? strings.alreadySentAnswer : strings.sendAnswer}
        </FormControl>
        </div>
    );
}