import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { getLocalStorage } from "../../../../Cookie"
import CardActionArea from '@material-ui/core/CardActionArea';
import { path } from "../../../consts"
import Skeleton from '@material-ui/lab/Skeleton';
import StarIcon from '@material-ui/icons/Star';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: theme.spacing(70),
        height: theme.spacing(70),
        backgroundColor: theme.palette.background.default,
    },
    media: {
        height: 140,
    },
    area: {
        marginTop: theme.spacing(0),
        margin: theme.spacing(0),
        // width: theme.spacing(62),
        width: "100%",
        height: theme.spacing(7),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(-4),
            width: `calc(100% + ${theme.spacing(8)}px)`,
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
        margin: theme.spacing(-1.5, -1),
    },
    margin3: {
        margin: theme.spacing(-1.5, -2),
    },
    score: {
        margin: theme.spacing(-0.5, -1),
        marginLeft: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(-1),
        },
        [theme.breakpoints.up('xl')]: {
            marginLeft: theme.spacing(10),
        },
    },
    email: {
        marginTop: theme.spacing(-2),
    },
    paper: {
        backgroundColor: theme.palette.background.default,
    },
    color: {
        background: theme.palette.primary.main,
    },
    skeleton: {
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
    star:{
        //   marginRight:theme.spacing(0),
          marginLeft: theme.spacing(0),
        //   color: "#ffd600"
    },
    divider:{
        background: theme.palette.primary.main,
        color:theme.palette.primary.main,
    }
}));

export default function MemberPaper(props) {
    const classes = useStyles();

    const [avatar, setAvatar] = React.useState(null);

    const [isAvatarLoading, setAvatarLoading] = React.useState(true);

    const fetchAvatar = () => {
        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${path}participants/${props.userId}/avatar`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
                    //   enqueueSnackbar("Ошибка обработки изменений :(", {
                    //     variant: 'error',
                    //   });
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

    const handleClick = () => {
        props.onClick();
    }

    React.useEffect(() => {
        fetchAvatar();
    }, [])

    return (
        <Card className={classes.area}>
            <CardActionArea onClick={handleClick}>
                <Paper className={classes.paper}>
                    <Grid container spacing={0} >
                        <Grid item className={classes.margin}>
                            <CardContent>
                                {(() => {
                                    if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.skeleton} />);
                                    else return (<Avatar alt={props.name} src={avatar} className={classes.orange}>{(props.name)[0]}</Avatar>)
                                })()}
                                {/* <Avatar alt={props.name} src={avatar} className={classes.orange}></Avatar> */}
                            </CardContent>
                        </Grid>
                        <Grid item className={classes.margin2} xs={8}>
                            <CardContent>
                                {/* Длина не больше 15 символов!*/}
                                <Typography gutterBottom variant="h6">
                                    {props.name}
                                </Typography>
                                <div className={classes.email}>
                                    <Typography variant="subtitle1">
                                        {props.email}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Grid>
                        <Divider orientation="vertical" />
                        <Grid item className={classes.score} xs={1}>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {props.points}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Divider orientation="vertical" className={classes.divider}/>
                        <Grid item xs={1} className={classes.star}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {(() =>{
                                        console.log("props.index: " + props.index)
                                        if(props.index === 0)
                                        return(
                                            <StarIcon className={classes.star} style={{color:"#ffd600"}}/>
                                        );
                                        if(props.index === 1)
                                        return(
                                            <StarIcon className={classes.star} style={{color:"#bdbdbd"}}/>
                                        );
                                        if(props.index === 2)
                                        return(
                                            <StarIcon className={classes.star} style={{color:"#d84315"}}/>
                                        );
                                    })()}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Paper>
            </CardActionArea>
        </Card>
    );
}