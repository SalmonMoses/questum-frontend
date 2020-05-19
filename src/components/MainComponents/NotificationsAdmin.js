import React, { useEffect } from 'react';
import { getLocalStorage } from '../../Cookie';
import { path } from '../consts';
import { IconButton, Badge, Icon, Popover, Typography, makeStyles, Grid, Divider } from '@material-ui/core';
import { NotificationComponent, shortenString } from '../Notification';
import Notifier from 'react-desktop-notification';
import useInterval from 'react-useinterval';
import { strings } from '../../localization'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
    grid: {
        padding: theme.spacing(),
        // background: theme.palette.primary.main,
    },
    typography: {
        padding: theme.spacing(2),
        // color: theme.palette.primary.contrastText,
    },
    popover: {
        height: '50%'
    },
    dot:{
        paddingTop: theme.spacing(1),
        color: theme.palette.secondary.main,
    }
}));

export function NotificationsAdmin() {
    const classes = useStyles();
    const [notifications, setNotifications] = React.useState([]);
    const [newNotificationsNumber, setNewNotificationsNumber] = React.useState(0);
    const [isOpen, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const parseNotificationAdmin = n => {
        let notification = {
            id: n.id,
            time: n.time,
            isRead: n.read
        }
        switch (n.type) {
            case "COMPLETED_SUBQUEST_OWNER":
                notification.msg = strings.formatString(strings.COMPLETED_SUBQUEST_OWNER_NOTIFICATION, n.content.user, shortenString(n.content.subquest, 14));
                notification.link = "https://questerium.herokuapp.com/"
                break;
            case "COMPLETED_QUEST_OWNER":
                notification.msg = strings.formatString(strings.COMPLETED_QUEST_OWNER_NOTIFICATION, n.content.user, shortenString(n.content.quest, 14));
                notification.link = "https://questerium.herokuapp.com/"
                break;
            case "SENT_ANSWER":
                notification.msg = strings.formatString(strings.SENT_ANSWER_NOTIFICATION, n.content.user, shortenString(n.content.subquest, 14));
                notification.link = "https://questerium.herokuapp.com/pending-quests"
                break;
            default:
                break;
        }
        return notification;
    }

    const fetchNotifications = async () => {
        let token = getLocalStorage("token");
        let id = getLocalStorage("id");
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
                    let newNotifications = result.items.map(parseNotificationAdmin);
                    console.dir(newNotifications);
                    setNotifications(newNotifications);
                    setNewNotificationsNumber(notifications.filter(n => !n.isRead).length);
                }
            })
            .catch(error => console.log('error', error));
    }

    const markAsRead = () => {
        let token = getLocalStorage("token");
        let id = getLocalStorage("id");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        let body = JSON.stringify({
            "items": notifications
                .filter(n => !n.isRead)
                .map(n => n.id)
        })

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: myHeaders,
            body
        };

        fetch(`${path}notifications/owner/${id}/markRead`, requestOptions)
        fetchNotifications();
        // setNotifications([]);
    }

    const updateNotifications = async () => {
        let token = getLocalStorage("token");
        let id = getLocalStorage("id");
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
                    let newNotifications = result.items.map(parseNotificationAdmin);
                    console.dir(newNotifications);
                    setNotifications([...notifications, ...newNotifications]);
                    if (result.items.length > 0) {
                        newNotifications.forEach(notification => {
                            Notifier.focus("Questerium",
                                notification.msg,
                                notification.link,
                                process.env.PUBLIC_URL + "/logo512.png");
                        });
                        setNewNotificationsNumber(newNotificationsNumber + result.items.length);
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    useInterval(updateNotifications, 15000);

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
            <IconButton aria-label="show new notifications" color="inherit" onClick={handleOpen}>
                <Badge badgeContent={newNotificationsNumber} color="secondary">
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
                                <Typography className={classes.typography}>
                                    {!n.isRead && <FiberManualRecordIcon className={classes.dot} />}
                                    {`${n.msg}`}
                                </Typography>
                                {i < notifications.length - 1 && <Divider />}
                            </Grid>))
                        : (
                            <Grid item>
                                <Typography className={classes.typography} variant="body2" display="block" gutterBottom>{strings.noNotifications}</Typography>
                            </Grid>
                        )}
                </Grid>
            </Popover>
        </>
    )
}