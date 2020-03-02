import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        // width: theme.spacing(75),
        height: theme.spacing(170),
    },
    margin: {
        marginTop: theme.spacing(-1),
    },
    area: {
        width: theme.spacing(60),
    },
}));



export default function AddQuest(props) {

    const classes = useStyles();

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Quest</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={5}>
                        <Grid item>
                            <DialogContentText>
                                Enter a title.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="title"
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <DialogContentText>
                                Enter description.
                            </DialogContentText>
                            <TextareaAutosize className={classes.area} aria-label="minimum height" rowsMin={10} placeholder="Your text.." />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.onClick} color="primary">
                        ADD
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}