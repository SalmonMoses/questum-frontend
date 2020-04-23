import React, { useEffect } from 'react';
import { getCookie } from '../../Cookie';
import { path } from '../consts';
import { IconButton, Badge, Icon, Popover, Typography } from '@material-ui/core';
import { NotificationComponent } from '../Notification';
import Notifier from 'react-desktop-notification';
import useInterval from 'react-useinterval';

export function NotificationsParticipants() {
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

        await fetch(`${path}notifications/participants/${id}`, requestOptions)
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

        fetch(`${path}notifications/participants/${id}/markRead`, requestOptions)
        fetchNotifications();
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

        await fetch(`${path}notifications/participants/${id}/new`, requestOptions)
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

    useInterval(updateNotifications, 500);

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
        <div>
            <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleOpen}>
                <Badge badgeContent={notifications.length} color="secondary">
                    <Icon>notifications</Icon>
                </Badge>
            </IconButton>
            <Popover
                onClose={handleClose}
                anchorEl={anchorEl}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                {notifications.length > 0
                    ? notifications.map(n => (<NotificationComponent notification={n} />))
                    : <Typography>You have no unread notifications</Typography>}
            </Popover>
        </div>
    )
}