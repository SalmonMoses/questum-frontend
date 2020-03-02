import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid"

export default function AddMember(props) {

  return (
    <div>
       <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
          <DialogContent>
          <Grid container direction="row" spacing={5}>
            <Grid item>
            <DialogContentText>
              Enter a name of a new member.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth
            />
            </Grid>
            <Grid item>
            <DialogContentText>
              Enter email of a new member.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="E-Mail"
              type="email"
              fullWidth
            />
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