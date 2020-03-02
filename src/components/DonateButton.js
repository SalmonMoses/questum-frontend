import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIcon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        fontSize: 11
    }
}));

export default function DonateButton() {
    const classes = useStyles();

    return (
        <ListItem>
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CoffeeIcon />}
        >
            Buy Us a Coffee
        </Button>
        </ListItem>
    )
}

function CoffeeIcon(props) {
    return (
        <img src="coffee.png" width="30"></img>
    )
}