import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCookie } from "../Cookie"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import { useSnackbar } from 'notistack';

export default function ChangeGroupName(props) {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
      name: "",
      id: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
    props.refresh();
  };

  const handleClose = () => {
    setOpen(false);
    props.refresh();
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChangeName = async (name, id) => {

    if(name.length < 3){
        enqueueSnackbar("Название группы должнго быть больше 3 символов", {
            variant: 'success',
          });
          handleClose();
          return;
    }

    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({ "name": name });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`http://localhost:8088/groups/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      handleClose();
      props.refresh();
  }

  return (
    <div>
       <IconButton aria-label="edit" onClick={handleClickOpen}>
          <Icon color="inherit">edit</Icon>
        </IconButton>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Group name changing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a new name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group name"
            type="name"
            fullWidth
            value={values.name}
            onChange={handleChange("name")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleChangeName(values.name, props.id)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}