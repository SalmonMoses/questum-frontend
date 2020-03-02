import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
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

function Coffee(){
    return(
        <head>
            <script data-name="BMC-Widget" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="LYUxBdy" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting. You can now buy me a coffee!" data-color="#FF813F" data-position="right" data-x_margin="18" data-y_margin="18"></script>
        </head>
    );
}

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
                <Coffee />
            </div>
        </main>
    );
}