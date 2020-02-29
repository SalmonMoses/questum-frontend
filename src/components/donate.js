import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { useHistory } from "react-router-dom";
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        marginTop: theme.spacing(10)
    },
    donate: {
        marginTop: theme.spacing(5)
    }
}));

export default function Donate() {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.paper}>
                <Typography className={classes.title} color="primary">
                    <Box fontSize="h4.fontSize">
                        Задонать нам на новые носки, бро
                    </Box>
                </Typography>
                <TextField
                    className={classes.donate}
                    style={{ width: "30%" }}
                    id="outlined-basic"
                    label="Donate"
                    variant="outlined"
                    helperText="Введите сумму, которую вам не жалко на поддержание проекта!"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <Button variant="contained" color="primary">
                    Donate
                </Button>
            </div>
        </main>
    );
}