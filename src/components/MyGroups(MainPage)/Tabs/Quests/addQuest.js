import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCookie } from "../../../../Cookie"
import { useHistory } from "react-router-dom";
import {path} from "../../../consts"

export default function AddQuest(props) {

  const [values, setValues] = useState({
    title:"",
    points: 0,
  });

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  } 

  let history = useHistory();


  const addQuest = async () => {

    let token = getCookie("token");

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
      setValues({title: "", points: 0});
  }

  return (
    <div>
      <Dialog open={props.open} fullWidth onClose={props.onClose} maxWidth={"sm"} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create</DialogTitle>
        <DialogContent>
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
            value={values.title}
            onChange={handleChange('title')}
          />
          <DialogContentText>
          Enter the number of points for the quest.
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="title"
            label="points"
            type="title"
            fullWidth
            value={values.points}
            onChange={handleChange('points')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            close
            </Button>
          <Button onClick={addQuest} color="primary">
            Create
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}