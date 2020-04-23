import React from 'react';
import { Typography, Divider, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
        // color: theme.palette.primary.contrastText,
    },
}));

export function NotificationComponent({ notification }) {
    const classes = useStyles();

    return (<div></div>)

}