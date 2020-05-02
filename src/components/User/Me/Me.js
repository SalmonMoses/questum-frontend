import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, LinearProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Container from '@material-ui/core/Container';
import { getLocalStorage } from "../../../Cookie"
import { path } from "../../consts";
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider';
import { strings } from "../../../localization"
import { withStyles } from '@material-ui/core/styles';
import ScoreTable from "./scoreTable"

const useStyles = makeStyles(theme => ({
  area: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(40),
  },
  cont: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },
  },
  paper: {
    minHeight: theme.spacing(100),
    marginTop: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {  // sm md lg - планшеты - компы.
      paddingRight: theme.spacing(0),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  avatarArea: {
    padding: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarSkeleton: {
    width: theme.spacing(20),
    height: theme.spacing(20),

  },
  container2: {
    marginTop: theme.spacing(2),
  },
}));

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.8)"
    }
  }
})(TextField);

export default function Me() {

  let name = getLocalStorage("name");
  let email = getLocalStorage("email");

  const [avatar, setAvatar] = useState(null);

  const [isAvatarLoading, setAvatarLoading] = useState(true);

  const fetchAvatar = () => {
    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${path}participants/${getLocalStorage("id")}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar(strings.authorizationError, {
            variant: 'error',
          });
          return;
        } else if (response.status === 500) {
          console.log('No avatar for this user!');
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

  useEffect(() => {
    fetchAvatar();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  function handleClick(type) {
    if (type === "ava") {
      enqueueSnackbar(strings.changeAvatar_Me, {
        variant: 'info',
      })
    }
    if (type === "email") {
      enqueueSnackbar(strings.changeEmail_Me, {
        variant: 'info',
      })
    }
    if (type === "name") {
      enqueueSnackbar(strings.changeName_Me, {
        variant: 'info',
      })
    }
    if (type === "group") {
      enqueueSnackbar(strings.changeGroup_Me, {
        variant: 'info',
      })
    }

  }
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>
          {/* <Avatar alt="Remy Sharp" src="" className={classes.avatar} /> */}


          <Grid item className={classes.avatarArea} direction="column" >
            <Grid container spacing={2} direction="column" className={classes.avatarArea}>
              <Grid item>
                {(() => {
                  if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.avatarSkeleton} />);
                  else return (<Avatar
                    onClick={() => handleClick("ava")}
                    alt={getLocalStorage("name")}
                    src={avatar}
                    className={classes.avatar}
                  >{getLocalStorage("name").charAt(0)}</Avatar>)
                })()}
              </Grid>

            </Grid>

          </Grid>

          <Grid container spacing={4} direction="column">
            <Grid item className={classes.area}>
              <DarkerDisabledTextField
                fullWidth
                onClick={() => handleClick("email")}
                id="standard-disabled"
                label={strings.eMail}
                defaultValue={email}
                disabled="true"
              />
            </Grid>

            <Grid item className={classes.area}>
              <DarkerDisabledTextField
                fullWidth
                onClick={() => handleClick("name")}
                id="standard-disabled"
                label={strings.name}
                defaultValue={name}
                disabled="true"
              />
            </Grid>

           <ScoreTable />

            
            <Divider style={{ marginTop: 15 }} />
            <Grid item className={classes.area}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component="span">
                {strings.DELETE_MY_ACCOUNT}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </main>
  );
}