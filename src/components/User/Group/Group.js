import React, { useState, useEffect } from 'react';
import { path } from "../../consts";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getLocalStorage } from "../../../Cookie"
import { useSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { strings } from "../../../localization"
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpandableParticipant from "./expandableParticipant"
import AdminInfo from './AdminInfo'


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
    height: `calc(100% + ${theme.spacing(1)}px)`,
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
    [theme.breakpoints.up('xs')]: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
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


export default function Group() {


  const [avatar, setAvatar] = useState(null);

  const [isAvatarLoading, setAvatarLoading] = useState(true);
  const [isGroupLoading, setGroupLoading] = useState(true);
  const [group, setGroup] = useState({});
  const [participants, setParticipants] = useState([])

  const fetchParticipants = () => {
    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${path}groups/${getLocalStorage("groupID")}/participants`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar(strings.authorizationError, {
            variant: 'error',
          });
          return;
        } else if (response.status === 500) {
          console.log('Error');
          setAvatarLoading(false);
          return;
        }
        return response.json();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          setParticipants(result);
        }
      })
      .catch(error => console.log('error', error));
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

    fetch(`${path}groups/${getLocalStorage("groupID")}/avatar`, requestOptions)
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


  const fetchGroup = () => {
    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${path}groups/${getLocalStorage("groupID")}`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar(strings.authorizationError, {
            variant: 'error',
          });
          return;
        } else if (response.status === 500) {
          console.log('No avatar for this user!');
          setGroupLoading(false);
          return;
        }
        return response.json();
      })
      .then(result => {
        if (result === undefined) {
          return;
        } else {
          setGroup(result)
          setGroupLoading(false)
        }
      })
      .catch(error => console.log('error', error));
  }


  useEffect(() => {
    fetchGroup();
    fetchAvatar();
    fetchParticipants();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.paper}>
        <Container className={classes.cont}>
          <Grid item className={classes.avatarArea} direction="column" >
            <Grid container spacing={2} direction="column" className={classes.avatarArea}>
              <Grid item>
                {(() => {
                  if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.avatarSkeleton} />);
                  else return (<Avatar
                    alt={getLocalStorage("name")}
                    src={avatar}
                    className={classes.avatar}
                  >{getLocalStorage("name").charAt(0)}</Avatar>)
                })()}
              </Grid>
              <Grid item className={classes.area1}>
                {(() => {
                  if (isGroupLoading) return (<Skeleton variant="text" width={200} height={50} />);
                  else {
                    console.log(group);
                    return (<>
                      <Typography color="primary" align='center'>
                        <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium" >
                          {group.name}
                        </Box>
                      </Typography>
                      <AdminInfo adminId={group.owner.id}></AdminInfo>
                    </>)
                  }
                })()}
                <Divider style={{ marginTop: 15 }} />
              </Grid>
              <Grid item className={classes.area1}>
                <Typography color="primary">
                  <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium" >
                    {strings.leaderboard}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {participants.map((participant, index) =>
            <ExpandableParticipant
              id={participant.id}
              name={participant.name}
              points={participant.points}
              index={index}
            />
          )}
        </Container>
      </Paper>
    </main>
  );
}