import React from 'react';
import { Typography, Divider } from '@material-ui/core';

export function NotificationComponent({ notification }) {
    return <div>
        <Typography>
            {`${notification.type}`}
        </Typography>
        <Divider />
    </div>
}