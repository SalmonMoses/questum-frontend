import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(35),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function NoMatch() {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.paper}>
                <Typography>
                    <Box fontSize="h5.fontSize">
                        404.. Эта страница не найдена.
                    </Box>
                </Typography>
                <Button href="/" color="primary">
                    Перейти на гравную страницу.
                </Button>
            </div>
        </main>
    );
}