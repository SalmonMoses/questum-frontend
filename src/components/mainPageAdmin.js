import React from 'react';
import ResponsiveDrawer from "./ResponsiveDrawer"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MediaCard from "./card"
import AppBarAdmin from "./AppBarAdmin"
import { CssBaseline } from '@material-ui/core';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    // card: {
    //     margin: theme.spacing(20, 20, 20)
    // },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    title: {
        marginTop: theme.spacing(-7),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function MainPageAdmin() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ResponsiveDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <MediaCard />
            </main>
        </div>
    );
}