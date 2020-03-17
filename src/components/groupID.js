import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LeadboardMain from "./leadboardMain";


const useStyles = makeStyles(theme => ({
    paper: {
        height: theme.spacing(200),
        margin: theme.spacing(3),
        width: theme.spacing(200)
        // paddingRight: theme.spacing(4),
        // paddingTop: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    cont: {
        marginTop: theme.spacing(2),
        width: "100%",
        // background: theme.palette.primary.main,
    },
    area: {
        marginLeft: theme.spacing(2),
        width: theme.spacing(40),
    },
    area1: {
        width: theme.spacing(70),
    },
    margin: {
        marginTop: theme.spacing(2),
    },
    area3: {
        height: theme.spacing(10)
    },
    large: {
        height: theme.spacing(20),
        width: theme.spacing(20),
        marginLeft: theme.spacing(66),
    },
    leadbord: {
        marginTop: theme.spacing(2),
    }
}));

export default function GroupId() {

    const classes = useStyles();

    return (
        // <Paper className={classes.paper}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Container className={classes.cont}>
                    <Grid >
                        <Grid item>
                            <Avatar className={classes.large} alt="Remy Sharp" src="\ava.png" />
                        </Grid>
                        <Grid item className={classes.leadbord}>
                            <LeadboardMain />
                        </Grid>
                    </Grid>
                    {/* <Avatar className={classes.large} alt="Remy Sharp" src="/components/ava.png" />
                    <Leadboard className={classes.leadbord}/> */}
                </Container>
            </main>
        // </Paper>
    );
}