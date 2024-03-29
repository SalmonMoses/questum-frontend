import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MemberPaper from "./member"
import { getLocalStorage } from "../../../../Cookie"
import {path} from "../../../consts"
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { strings } from '../../../../localization'

const useStyles = makeStyles(theme => ({
  width:{
    width: `calc(100% + ${theme.spacing(8)}px)`,
    // background: theme.palette.primary.main,
  }
}));

export default function DeleteMember(props) {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () =>{

    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    // myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        headers: myHeaders,
      };
      
    await fetch(`${path}participants/${props.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        props.refresh();
        handleClose();
  }

  return (
    <div className={classes.width}>
      <MemberPaper index={props.index} onClick={handleClickOpen} userId={props.id} name={props.name} points={props.points} email={props.email} refresh={() => props.refresh()} id={history.location.search.slice(4)}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{strings.deleteMember}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {strings.formatString(strings.doUWantToDelete, props.name)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {strings.CANCEL}
          </Button>
          <Button disableElevation="true" variant="contained" onClick={deleteUser} color="primary" autoFocus>
            {strings.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}