import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid"
import { getCookie } from "../../../../Cookie"
import { useHistory } from "react-router-dom";
import { path } from '../../../consts';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dialog: {
    overflow: 'hidden !important'
  }
}));

export default function AddMember(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  let history = useHistory();

  const handleClick = async () => {

    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({ "email": values.email, "name": values.name });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let id = getCookie("groupId");
    if (history.location.search.slice(4) !== "") {
      id = history.location.search.slice(4)
    }
    console.log("id: " + id)

    await fetch(`${path}groups/${id}/participants`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    props.onClick();
    props.refresh();
    setValues({ ...values, name: "", email: "" });
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container direction="row" spacing={5}>
            <Grid item>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
                value={values.name}
                onChange={handleChange("name")}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                id="email"
                label="E-Mail"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange("email")}
                variant="outlined"
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClick} color="primary">
            Cancel
            </Button>
          <Button onClick={handleClick} color="primary">
            ADD
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}