import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MemberPaper from "./member"
import { getCookie } from "../Cookie"
import { useHistory } from "react-router-dom";

export default function DeleteMember(props) {
  const [open, setOpen] = React.useState(false);

  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () =>{

    let token = getCookie("token");

    var myHeaders = new Headers();

    // myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        headers: myHeaders,
      };
      
    await fetch(`http://localhost:8088/participants/${props.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        props.refresh();
        handleClose();
  }

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <MemberPaper onClick={handleClickOpen} name={props.name} points={props.points} email={props.email} refresh={() => props.refresh()} id={history.location.search.slice(4)}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Name: {props.name} Email: {props.email} Do you want to delete {props.name} from this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={deleteUser} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}