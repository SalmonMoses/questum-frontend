import React, { useState, useEffect } from 'react';
import { path } from "../consts";
import Skeleton from '@material-ui/lab/Skeleton';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Container from '@material-ui/core/Container';
import { getCookie} from "../../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider';

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

  let name = getCookie("name");
  let email = getCookie("email");
  let group = getCookie("group");

  if (name === undefined) {
    history.push("/login/user");
    enqueueSnackbar("Время сессии истекло, войдите заново.", {
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
    let token = getCookie("token");

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${path}participants/${getCookie("id")}/avatar`, requestOptions)
      .then(response => {
        if (response.status === 401) {
          console.log("Authorization error");
          enqueueSnackbar("Ошибка обработки изменений :(", {
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
    let token = getCookie("token");

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

    fetch(`${path}participants/${getCookie("id")}/avatar`, requestOptions)
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
          fetchAvatar();
          enqueueSnackbar('Аватар успешно обновлен (может понадобиться обновление страницы)', {
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
                else return (<Avatar alt={getCookie("name")} src={avatar} className={classes.avatar}>{getCookie("name").charAt(0)}</Avatar>)
              })()}
            </Grid>
            <Grid item>
              <Input
                style={{ display: 'none' }}
                id="avatar-file-input"
                type="file"
                accept="image/*"
                onChange={uploadAvatar} 
              />
              <label htmlFor="avatar-file-input">
                <Button variant="contained" color="primary" className={classes.iconButton} component="span" startIcon={<CloudUploadIcon />}>Upload new photo</Button>
              </label>
            </Grid>
          </Grid>
        
        </Grid>

        <Grid container spacing={4} direction="column">
          <Grid item className={classes.area}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Name"
                defaultValue={email}
                disabled="true"
              />
          </Grid>  

          <Grid item className={classes.area}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Email"
                defaultValue={name}
              />
            </Grid> 

            <Grid item className={classes.area}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Group"
                defaultValue={group}
              />
            </Grid> 
            <Divider style = {{marginTop: 15}}/>
            <Grid item className={classes.area}>
              <Button
                variant="contained" 
                color="primary" 
                fullWidth
                component="span">
                  Delete my account
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