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
import { getLocalStorage } from "../../../../../Cookie"
import TextField from '@material-ui/core/TextField';
import { path } from "../../../../consts"
import { strings } from '../../../../../localization'

const useStyles = makeStyles(theme => ({
    area: {
        // width: theme.spacing(60),
        width: "100%",
    },
    chip: {
        marginLeft: theme.spacing(1),
    },
    button: {
        width: theme.spacing(59),
    },
    add: {
        // width: theme.spacing(59),
        width: "100%",
    },
    width: {
        // width: "100%",
        width: `calc(100% + ${theme.spacing(2)}px)`,
    },
    color: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        overflow: 'hidden !important'
        // background: theme.palette.primary.main,
    },
    dialog: {
        overflow: 'hidden !important'
    }
}));



export default function AddSubQuest(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState({
        desc: "",
        type: "",
        expectedAnswer: "",

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
        console.log(values.type.length);

        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw;

        if (values.type === "NONE" || values.type === "IMAGE") {
            console.log("EXEXE");
            raw = JSON.stringify({ "desc": values.desc, "order": 0, "verification": values.type, "expectedAnswer": null });
        } else {
            raw = JSON.stringify({ "desc": values.desc, "order": 0, "verification": values.type, "expectedAnswer": values.expectedAnswer });
        }

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
        setValues({desc: "", type: "", expectedAnswer: ""});
    }

    const type = value => {
        setValues({ ...values, type: value });
    }

    return (
        <div className={classes.color}>
            <Button className={classes.add} variant="outlined" color="primary" onClick={handleClickOpen} >
                {strings.addNewSubquest}
            </Button>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{strings.addSubquest}</DialogTitle>
                <DialogContent className={classes.dialog}>
                    <Grid container direction="column" spacing={3}>
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
                            {/* <DialogContentText>
                                {strings.enterDescription}
                            </DialogContentText> */}
                            <TextField
                                variant="outlined"
                                value={values.desc}
                                multiline
                                onChange={handleChange("desc")}
                                className={classes.area}
                                aria-label="minimum height"
                                // rowsMin={10}
                                label="Description" />
                            {/* <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                value={values.desc}
                                onChange={handleChange("desc")} */}
                            {/* /> */}
                        </Grid>
                        {values.type === "TEXT" && (<Grid item>
                            <TextField
                                fullWidth
                                id="standard-disabled"
                                label={`${strings.expectAnswer}: `}
                                variant="outlined"
                                value={values.name}
                                onChange={handleChange("expectedAnswer")}
                            />
                        </Grid>)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {strings.CANCEL}
                    </Button>
                    <Button onClick={addSubQuest} color="primary">
                        {strings.ADD}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}