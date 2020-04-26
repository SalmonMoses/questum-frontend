import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCookie } from "../../../Cookie"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import { useSnackbar } from 'notistack';
import { path } from "../../consts"
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, makeStyles, Input } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles(theme => ({
  avatarSpan: {
    // width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  inputSpan: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(1)
  }
}));

export default function ChangeGroupName(props) {
  const [open, setOpen] = React.useState(false);
  const [newAvatarData, setNewAvatarData] = React.useState(null);
  const [newAvatar, setNewAvatar] = React.useState(props.avatar);
  const [hasAvatarChanged, setAvatarChanged] = React.useState(false);
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: props.name,
    id: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
    props.refresh();
    props.handleClose();
  };

  const handleCloseDialog = () => {
    setOpen(false);
    props.refresh();
    console.log("OPEN" + open);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const uploadAvatar = async (id) => {
    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    let avatar = new FormData();
    avatar.append('avatar', newAvatarData)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: avatar
    };

    fetch(`${path}groups/${id}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar("Ошибка обработки изменений :(", {
            variant: 'error',
          });
          return;
        }
        return response.blob();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          enqueueSnackbar('Аватар успешно обновлен (может понадобиться обновление страницы)', {
            variant: 'success'
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleChangeName = async (name, id) => {

    if (name.length < 3) {
      enqueueSnackbar("Название группы должнго быть больше 3 символов", {
        variant: 'success',
      });
      handleCloseDialog();
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

    await fetch(`${path}groups/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    if (hasAvatarChanged) {
      uploadAvatar(id);
    }

    handleCloseDialog();
    props.refresh();
  }

  const changeAvatar = (e) => {
    setNewAvatarData(e.target.files[0]);
    setNewAvatar(URL.createObjectURL(e.target.files[0]));
    setAvatarChanged(true);
  }

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        {/* <IconButton aria-label="edit" onClick={handleClickOpen}>
          <Icon color="inherit">edit</Icon>
        </IconButton>
        Edit */}
        <Icon>edit</Icon>
        Edit
        </MenuItem>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit group</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Enter a new name
          </DialogContentText> */}
          <div className={classes.avatarSpan}>
            <Avatar src={newAvatar} className={classes.avatar}>{values.name.substring(0, 1)}</Avatar>
          </div>
          <div className={classes.inputSpan}>
            <Input
              style={{ display: 'none' }}
              id="avatar-file-input"
              type="file"
              accept="image/*"
              onChange={changeAvatar} />
            <label htmlFor="avatar-file-input">
              <Button variant="contained" color="primary" className={classes.iconButton} component="span" startIcon={<CloudUploadIcon />}>Change avatar</Button>
            </label>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group name"
            type="name"
            fullWidth
            value={values.name}
            onChange={handleChange("name")}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleChangeName(values.name, props.id)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}