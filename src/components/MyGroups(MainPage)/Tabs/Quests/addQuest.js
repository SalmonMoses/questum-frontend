import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getLocalStorage } from "../../../../Cookie"
import { useHistory } from "react-router-dom";
import { path } from "../../../consts"
import { makeStyles } from '@material-ui/core';
import { strings } from '../../../../localization'

const useStyles = makeStyles(theme => ({
  label: {
    paddingTop: theme.spacing(2)
  }
}));

export default function AddQuest(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    title: "",
    points: 0,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  let history = useHistory();


  const addQuest = async () => {

    let token = getLocalStorage("token");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({ "title": values.title, "desc": "Just some more testing", points: values.points });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${path}groups/${history.location.search.slice(4)}/quests`, requestOptions)
      .then(response => response.text())
      .then(result => console.log("Quest: " + result))
      .catch(error => console.log('error', error));

    props.onClose();
    props.refresh();
    setValues({ title: "", points: 0 });
  }

  return (
    <div>
      <Dialog open={props.open} fullWidth onClose={props.onClose} maxWidth={"sm"} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{strings.createNewQuest}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a title.
            </DialogContentText>
          <TextField
            autoFocus
            // margin="dense"
            id="title"
            label={strings.title}
            type="title"
            fullWidth
            value={values.title}
            onChange={handleChange('title')}
            variant="outlined"
          />
          <DialogContentText className={classes.label}>
            Enter the number of points for the quest.
            </DialogContentText>
          <TextField
            // autoFocus
            // margin="dense"
            id="title"
            label="Points"
            type="title"
            fullWidth
            value={values.points}
            onChange={handleChange('points')}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            {strings.CANCEL}
            </Button>
          <Button onClick={addQuest} color="primary">
            {strings.CREATE}
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}