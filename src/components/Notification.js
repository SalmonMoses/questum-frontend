import React from 'react';
import { Typography, Divider, Grid, makeStyles } from '@material-ui/core';
import {strings} from '../localization'

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

export function shortenString(str, len) {
    if (str.length < len) return str;
    else return str.substring(0, len - 3) + "...";
}