import React, { useEffect } from 'react';
import { getCookie } from '../../Cookie';
import { path } from '../consts';
import { IconButton, Badge, Icon, Popover, Typography, makeStyles, Grid, Divider } from '@material-ui/core';
import { NotificationComponent } from '../Notification';
import Notifier from 'react-desktop-notification';
import useInterval from 'react-useinterval';

const useStyles = makeStyles(theme => ({
    grid: {
        padding: theme.spacing(),
        // background: theme.palette.primary.main,
    },
    typography: {
        padding: theme.spacing(2),
        // color: theme.palette.primary.contrastText,
    },
}));

export function NotificationsAdmin() {
    const classes = useStyles();
    const [notifications, setNotifications] = React.useState([]);
    const [isOpen, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const fetchNotifications = async () => {
        let token = getCookie("token");
        let id = getCookie("id");
        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };

        await fetch(`${path}notifications/owner/${id}`, requestOptions)
            .then(response => {
                if (response.status === 400) {
                    return undefined;
                } else {
                    return response.json();
                }
            })
            .then(result => {
                if (result === undefined) {
                    console.log("error ")
                } else {
                    console.log(result);
                    setNotifications(result.items);
                }
            })
            .catch(error => console.log('error', error));
    }

    const markAsRead = () => {
        let token = getCookie("token");
        let id = getCookie("id");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        let body = JSON.stringify({
            "items": notifications.map(n => n.id)
        })

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: myHeaders,
            body
        };

        fetch(`${path}notifications/owner/${id}/markRead`, requestOptions)
        setNotifications([]);
    }

    const updateNotifications = async () => {
        let token = getCookie("token");
        let id = getCookie("id");
        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };

        await fetch(`${path}notifications/owner/${id}/new`, requestOptions)
            .then(response => {
                if (response.status === 400) {
                    return undefined;
                } else {
                    return response.json();
                }
            })
            .then(result => {
                if (result === undefined) {
                    console.log("error ")
                } else {
                    console.log(result);
                    setNotifications([...notifications, ...result.items]);
                    if (result.items.length > 0) {
                        result.items.forEach(notification => {
                            Notifier.focus("Questerium",
                                notification.type,
                                "questerium.herokuapp.com",
                                process.env.PUBLIC_URL + "/logo512.png");
                        })
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    useInterval(updateNotifications, 1500);

    const handleOpen = (event) => {
        if (!isOpen) {
            setAnchorEl(event.currentTarget);
            setOpen(true);
        }
    }

    const handleClose = () => {
        markAsRead();
        setOpen(false);
        setAnchorEl(null);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <>
            <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleOpen}>
                <Badge badgeContent={notifications.length} color="secondary">
                    <Icon>notifications</Icon>
                </Badge>
            </IconButton>
            <Popover
                onClose={handleClose}
                className={classes.popover}
                anchorEl={anchorEl}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                modifiers={{
                    arrow: {
                        enabled: true
                    }
                }}>
                <Grid
                    container
                    justify="flex-end"
                    direction="column"
                    className={classes.grid}
                >
                    {notifications.length > 0
                        ? notifications.map((n, i) =>
                            (<Grid item>
                                <Typography className={classes.typography}>{n.type}</Typography>
                                {i < notifications.length - 1 && <Divider />}
                            </Grid>))
                        : (
                            <Grid item>
                                <Typography className={classes.typography} variant="body2" display="block" gutterBottom>You have no unread notifications</Typography>
                            </Grid>
                        )}
                </Grid>
            </Popover>
        </>
    )
}