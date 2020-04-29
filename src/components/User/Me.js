import React, { useState, useEffect } from 'react';
import { path } from "../consts";
import Skeleton from '@material-ui/lab/Skeleton';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Container from '@material-ui/core/Container';
import { getLocalStorage} from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider';
import { strings } from "../../localization"

const useStyles = makeStyles(theme => ({
  area: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(40),
  },
  cont: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
    },
  },
  paper: {
    minHeight: theme.spacing(100),
    marginTop: theme.spacing(0),
    [theme.breakpoints.up('xs')]: { // xs - телефон
      paddingRight: theme.spacing(0),
  },
 
  [theme.breakpoints.up('sm')]: {  // sm md lg - планшеты - компы.
      paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.up('lg')]: {
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
  cont: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(0),
  },
  [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
  },
  [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
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

export default function Me() {

  let name = getLocalStorage("name");
  let email = getLocalStorage("email");
  let group = getLocalStorage("group");

  if (name === undefined) {
    history.push("/login/user");
    enqueueSnackbar(strings.sessionTimeout, {
      variant: 'error',
    });
  }

  

  // const [values, setValues] = useState({
  //   name: props.name,
  //   email: props.email,

  // });

  const [avatar, setAvatar] = useState(null);

  const [isAvatarLoading, setAvatarLoading] = useState(true);
  let history = useHistory();

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


  const uploadAvatar = (e) => {
    let token = getLocalStorage("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    let avatar = new FormData();
    avatar.append('avatar', e.target.files[0])

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: avatar
    };

    setAvatarLoading(true);

    fetch(`${path}participants/${getLocalStorage("id")}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar(strings.authorizationError, {
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
          fetchAvatar();
          enqueueSnackbar(strings.resetAvatar, {
            variant: 'success'
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchAvatar();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  //Проверка на наличие refreshToken
  
 ////////////////////////////////////

  const classes = useStyles();

  function handleClick(type){
    if(type === "ava"){
    enqueueSnackbar(strings.changeAvatar_Me, {
      variant: 'info',
    })}
    if(type === "email"){
      enqueueSnackbar(strings.changeEmail_Me, {
        variant: 'info',
    })}
    if(type === "name"){
      enqueueSnackbar(strings.changeName_Me, {
        variant: 'info',
    })}    
    if(type === "group"){
      enqueueSnackbar(strings.changeGroup_Me, {
        variant: 'info',
    })}

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
                if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.avatarSkeleton}/>);
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
              <TextField
                fullWidth
                onClick={() => handleClick("email")}
                id="standard-disabled"
                label={strings.eMail}
                defaultValue={email}
                disabled="true"
              />
          </Grid>  

          <Grid item className={classes.area}>
              <TextField
                fullWidth
                onClick={() => handleClick("name")}
                id="standard-disabled"
                label={strings.name}
                defaultValue={name}
                disabled="true"
              />
            </Grid> 

            <Grid item className={classes.area}>
              <TextField
                fullWidth
                onClick={() => handleClick("group")}
                id="standard-disabled"
                label={strings.group}
                defaultValue={group}
                disabled="true"
              />
            </Grid> 
            <Divider style = {{marginTop: 15}}/>
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




                 
           
  
            {/* <div class="classes.container1">
              <div class="classes.container2">
               <button type="button">Click</button>
              </div>
            </div> */}

         {/* здесь пиши код страницы 
         Чтоб все корректно отображалось нужно использовать размены елементов в процентах
         width: "100%" - в контейнерах и компонентах
         либо fullWidth
         статически никогда не указый размер!!
         Должно быть так, чтоб когда ты менял утсройсво(с 7 айфона на 7+ например)
         все так же отображалась как и задумывалось
         */}
        </Container>
      </Paper>
    </main>
  );
}