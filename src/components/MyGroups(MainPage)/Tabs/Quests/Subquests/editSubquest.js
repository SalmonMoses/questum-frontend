import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import VarificationTypes from "./varificationTypes"
import { getCookie } from "../../../../../Cookie"
import Chip from '@material-ui/core/Chip';
import {path} from "../../../../consts"
import { strings } from "../../../../../localization"

const useStyles = makeStyles(theme => ({
    area: {
        width: theme.spacing(60),
    },
    chip: {
        marginLeft: theme.spacing(1),
    },
    button: {
        width: theme.spacing(59),
    }
}));



export default function EditSubquest(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState({
        desc: props.desc,
        type: props.verificationType,

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

    const editSubQuest = async () => {
        console.log(values.type);

        let token = getCookie("token");

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({ "desc": values.desc, "verification": values.type });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${path}subquests/${props.subquestId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        handleClose();
        props.refresh();
    }

    const type = value => {
        setValues({ ...values, type: value });
    }

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <Icon color="primary">edit</Icon>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{strings.editSubquest}</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={5}>
                        <Grid item>
                            <DialogContentText>
                                {strings.typeOfVarification}
                            </DialogContentText>
                            {/* <Chip
                                onClick={() => handleType("IMAGE")}
                                clickable
                                label="Image"
                                color="primary"
                                icon={<Icon>image</Icon>} />
                            <Chip
                                onClick={() => handleType("TEXT")}
                                className={classes.chip}
                                clickable
                                label="TEXT"
                                color="primary"
                                icon={<Icon>text_format</Icon>} />
                            <Chip
                                onClick={() => handleType("NONE")}
                                className={classes.chip}
                                clickable
                                label="NONE"
                                color="primary"
                                icon={<Icon>radio_button_unchecked</Icon>} /> */}
                            <VarificationTypes type={type} />
                        </Grid>
                        <Grid item>
                            <DialogContentText>
                                {strings.enterDescription}
                            </DialogContentText>
                            <TextareaAutosize
                                value={values.desc}
                                onChange={handleChange("desc")}
                                className={classes.area}
                                aria-label="minimum height"
                                rowsMin={10}
                                placeholder="Your text.." />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {strings.CANCEL}
                    </Button>
                    <Button onClick={editSubQuest} color="primary">
                        {strings.EDIT}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}