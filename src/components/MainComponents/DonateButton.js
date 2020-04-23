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
            href="https://www.buymeacoffee.com/Questerium"
        >
            Buy Us a Coffee
        </Button>
        </ListItem>
    )
}

function CoffeeIcon(props) {
    return (
        <img src={process.env.PUBLIC_URL + "/coffee.png"} alt="donate" width="30px"></img>
    )
}