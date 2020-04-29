import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { getLocalStorage } from "../../../../Cookie"
import {path} from "../../../consts"
import { strings } from '../../../../localization'

export default function DeleteQuest(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteQuest = async () => {

        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: myHeaders,
        };

        await fetch(`${path}quests/${props.questId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        props.refresh();
        handleClose();
    }

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <Icon color="primary">delete</Icon>
            </IconButton>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{strings.deleteQuest}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {strings.formatString(strings.doUWantToDeleteQuest, props.questTitle)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {strings.CANCEL}
                    </Button>
                    <Button variant="contained" onClick={deleteQuest} color="primary" autoFocus>
                        {strings.DELETE}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}