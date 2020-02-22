import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: theme.spacing(70),
        height: theme.spacing(70),
        backgroundColor: theme.palette.background.default,
    },
    media: {
        height: 140,
    },
    area: {
        marginTop: theme.spacing(0),
        margin: theme.spacing(2),
        maxWidth: theme.spacing(66),
        maxHeight: theme.spacing(7),
    },
    area2: {
        maxWidth: theme.spacing(66),
        maxHeight: theme.spacing(7),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    margin: {
        margin: theme.spacing(-1),
    },
    margin2: {
        margin: theme.spacing(-1.5, -1),
    },
    margin3: {
        margin: theme.spacing(-1.5, -2),
    },
    score: {
        margin: theme.spacing(-0.5, -1),
        marginLeft: theme.spacing(19),
    },
    email:{
        marginTop: theme.spacing(-2),
    },
    paper: {
        backgroundColor: theme.palette.background.default,
    },
}));

export default function MemberPaper() {
    const classes = useStyles();

    return (
        <Card className={classes.area}>
            <Paper className={classes.paper}>
                <Grid container spacing={0} >
                    <Grid item className={classes.margin}>
                        <CardContent>
                            <Avatar className={classes.orange}>N</Avatar>
                        </CardContent>
                    </Grid>
                    <Grid item className={classes.margin2} xs={6}>
                        <CardContent>
                            {/* Длина не больше 15 символов!*/}
                            <Typography gutterBottom variant="h5" component="h2">
                                User1
                            </Typography>
                            <div className={classes.email}>
                            <Typography gutterBottom variant="h7" component="h7" >
                            wtf@wtf.wtf
                            </Typography>
                            </div>
                            
                        </CardContent>
                    </Grid>
                    {/* <Grid item className={classes.margin2}  xs={6}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    wtf@wtf.wtf
             </Typography>
                </CardContent>
              </Grid> */}
                    <Divider orientation="vertical" />
                    <Grid item className={classes.score}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                10
             </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Paper>
        </Card>
    );
}