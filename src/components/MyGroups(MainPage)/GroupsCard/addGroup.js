import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {path} from "../../consts"
import { getCookie, setCookie} from "../../../Cookie"
import { strings } from '../../../localization'

export default function AddGroup(props) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
      props.onClick();
    };
  
    const handleClose = () => {
      setOpen(false);
      props.onClick();
    };
  
    const [values, setValues] = useState({
      name: "",
    });
  
    const handleChange = prop => event => {
      setValues({ ...values, [prop]: event.target.value })
    }
  
    let token = getCookie("token");
  
    const handleClick = async () => {
  
      var myHeaders = new Headers();
  
      myHeaders.append("Content-Type", "application/json");
  
      myHeaders.append("Authorization", "Bearer " + token);
  
      var raw = JSON.stringify({ "name": values.name });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      await fetch(path + "groups", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setCookie("groupId", result.id)
        })
        .catch(error => console.log('error', error));
      handleClose();
      props.onClick();
    }
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          {strings.createNewGroup}
        </Button>
        <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{strings.newGroupCreate}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name of your new group.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={strings.groupName}
              type="name"
              fullWidth
              value={values.name}
              onChange={handleChange("name")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {strings.CANCEL}
            </Button>
            <Button onClick={() => handleClick()} color="primary">
              {strings.CREATE}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }