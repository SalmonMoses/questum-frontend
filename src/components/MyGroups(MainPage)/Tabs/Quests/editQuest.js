import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getLocalStorage } from "../../../../Cookie"
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {path} from "../../../consts"
import { strings } from '../../../../localization'

export default function EditQuest(props) {

    const [values, setValues] = useState({
        title: props.questTitle,
        points: 0
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const editQuest = async () => {

        let token = getLocalStorage("token");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({ "title": values.title });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        await fetch(`${path}quests/${props.questId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        handleClose();
        props.refresh();
    }

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <Icon color="primary">edit</Icon>
            </IconButton>
            <Dialog open={open} fullWidth maxWidth={"sm"} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{strings.editQuest}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Enter a new name.
            </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="normal"
                        id="title"
                        label={strings.title}
                        type="title"
                        fullWidth
                        value={values.title}
                        onChange={handleChange('title')}
                        variant="outlined"
                    />
                    <TextField
                        // autoFocus
                        margin="normal"
                        id="title"
                        label={strings.points}
                        type="title"
                        fullWidth
                        value={values.points}
                        onChange={handleChange('points')}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {strings.CANCEL}
                    </Button>
                    <Button onClick={editQuest} color="primary">
                        {strings.EDIT}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}