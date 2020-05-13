import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Icon } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import { getLocalStorage } from "../../../Cookie"
import ChangeGroupName from "./DialogChangeName"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { path } from "../../consts"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Skeleton from '@material-ui/lab/Skeleton';
import { strings } from "../../../localization"
import ConfirmDeleting from "../../confirmDeleting"
import {shortenString} from "../../Notification"

const useStyles = makeStyles(theme => ({
  area: {
    marginTop: theme.spacing(0),
    margin: theme.spacing(2),
    width: theme.spacing(60),
    height: theme.spacing(7),
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      marginLeft: theme.spacing(0)
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: theme.spacing(0),
      margin: theme.spacing(2),
      width: theme.spacing(80),
      height: theme.spacing(7),
    },
  },
  area2: {
    maxWidth: theme.spacing(66),
    maxHeight: theme.spacing(7),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  margin: {
    margin: theme.spacing(-1),
  },
  margin2: {
    margin: theme.spacing(-0.5, -1),
    // backgroundColor: theme.palette.primary.main,
  },
  margin3: {
    margin: theme.spacing(-1.5, -2),
    // backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginLeft: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  action: {
    width: theme.spacing(62),
  },
  button: {
    marginLeft: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
      width: '15%',
    },
    // marginLeft: theme.spacing(-1),
  },
  button2: {
    marginLeft: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      width: '10%',
    },
  },
  color: {
    background: grey[500],
  },
  width: {
    width: '70%',
    // backgroundColor: theme.palette.primary.main,
  },
  menu: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(0),
    },
  },
  skeleton: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  }
}));

export default function GroupPaper(props) {
  const classes = useStyles();

  let history = useHistory();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [avatar, setAvatar] = useState(null);
  const [isAvatarLoading, setAvatarLoading] = useState(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if (matches) {
      history.push("/group?id=" + props.id);
    } else {
      history.push("/groups?id=" + props.id);
      props.refresh();
    }
  }

  const fetchAvatar = () => {
    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${path}groups/${props.id}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          //   enqueueSnackbar("Ошибка обработки изменений :(", {
          //     variant: 'error',
          //   });
          return;
        } else if (response.status === 500) {
          console.log('No avatar for this group!');
          setAvatarLoading(false);
          return;
        }
        return response.blob();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          setAvatar(URL.createObjectURL(result));
          setAvatarLoading(false);
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleGroupDelete = async () => {

    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: myHeaders,
    };

    await fetch(`${path}groups/${props.id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    handleCloseDialog();
    props.refresh();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(history.location.search.slice(4) + " " + props.id);

  useEffect(() => {
    fetchAvatar()
  }, []);

  return (
    <Grid container direction="row">
      <Grid item className={classes.width} xs={10}>
        <Card className={classes.area}>
          <CardActionArea onClick={handleClick}>
            <Paper className={props.id == history.location.search.slice(4) ? classes.color : classes.paper}>
              <Grid container spacing={0}>
                <Grid item className={classes.margin}>
                  <CardContent>
                    {(() => {
                      if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.skeleton} />);
                      else return (<Avatar alt={props.name} src={avatar}>{(props.name)[0]}</Avatar>)
                    })()}
                  </CardContent>
                </Grid>
                <Grid item className={classes.margin2} xs={9}>
                  <CardContent>
                    {/* Длина не больше 15 символов!*/}
                    <Typography variant="h6" component="h2">
                      {shortenString(props.name, 17)}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item className={classes.icon}>
                  <CardContent>
                    <Icon color="inherit">people_alt</Icon>
                  </CardContent>
                </Grid>
                <Grid item className={classes.margin3}>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item className={classes.menu}>
        <IconButton
          aria-label="more"
          aria-controls="menu"
          aria-haspopup="false"
          onClick={handleClickMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ChangeGroupName name={props.name} id={props.id} refresh={() => props.refresh()} handleClose={handleClose} />
          <MenuItem onClick={handleClickOpen}>
            <Icon color="primary">delete</Icon>
            {strings.deleteMenu}
          </MenuItem>
          <ConfirmDeleting 
          open={open} 
          close={handleCloseDialog} 
          delete={handleGroupDelete} 
          title={strings.DELETE_THE_GROUP}
          text={strings.CONFIRM_DELETING}
           />
        </Menu>
      </Grid>
    </Grid>
  );
}