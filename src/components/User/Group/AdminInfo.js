import React, { useEffect } from 'react';
import { makeStyles, Typography, Grid, Avatar } from '@material-ui/core';
import { getLocalStorage } from '../../../Cookie';
import { path } from '../../consts';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        margin: theme.spacing(1),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(1),
    },
    skeleton: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}))

export default function AdminInfo({ adminId }) {
    const classes = useStyles();
    const [adminInfo, setAdminInfo] = React.useState({
        id: adminId,
        name: '',
        email: ''
    });
    const [avatar, setAvatar] = React.useState(null);
    const [isAvatarLoading, setAvatarLoading] = React.useState(true);

    const fetchAdminInfo = async () => {
        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${path}owners/${adminId}`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
                    return;
                } else if (response.status === 500) {
                    console.log('No avatar for this group!');
                    setAvatarLoading(false);
                    return;
                }
                return response.json();
            }).then(json => {
                setAdminInfo(json);
            });
    }

    const fetchAvatar = async () => {
        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${path}owners/${adminId}/avatar`, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    console.log("Authorization error");
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

    useEffect(() => {
        fetchAdminInfo().then(() => {
            fetchAvatar();
        });
    }, []);

    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item>
                {(() => {
                    if (isAvatarLoading) return (<Skeleton variant="circle" className={classes.skeleton} />);
                    else return (<Avatar alt={adminInfo.name} src={avatar}>{(adminInfo.name)[0]}</Avatar>)
                })()}
            </Grid>
            <Grid item>
                <Typography className={classes.heading}>{adminInfo.name}</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.heading}>{adminInfo.email}</Typography>
            </Grid>
        </Grid>
    )
}