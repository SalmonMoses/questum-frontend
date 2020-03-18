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
import VarificationTypes from "./varificationTypes"
import { getCookie } from "../../../../../Cookie"
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import {path} from "../../../../consts"

const useStyles = makeStyles(theme => ({
    area: {
        width: theme.spacing(60),
    },
    chip: {
        marginLeft: theme.spacing(1),
    },
    button:{
        width:theme.spacing(59),
    },
    add:{
        width: theme.spacing(59),
        marginLeft: theme.spacing(2),
    },
}));



export default function AddSubQuest(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState({
        desc: "",
        type: "",

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

    const addSubQuest = async () => {
        console.log(values.type);

        let token = getCookie("token");

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({ "desc": values.desc, "order": 0, "verification": values.type });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${path}quests/${props.questId}/subquests`, requestOptions)
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
            <Button className={classes.add} variant="outlined" color="primary" onClick={handleClickOpen} >
                Add new subquest
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Subquest</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={5}>
                        <Grid item>
                            <DialogContentText>
                                Chose type of varification
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
                            <VarificationTypes type={type}/>
                        </Grid>
                        <Grid item>
                            <DialogContentText>
                                Enter description.
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
                        Cancel
                    </Button>
                    <Button onClick={addSubQuest} color="primary">
                        ADD
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}