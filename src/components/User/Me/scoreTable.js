import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getLocalStorage } from "../../../Cookie"
import { path } from "../../../components/consts";
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography } from '@material-ui/core';
import { strings } from '../../../localization';

const useStyles = makeStyles(theme => ({
    table: {
        width: "100%",
    },
}));

export default function ScoreTable(props) {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(true);

    const [score, setScore] = React.useState({});

    const getScoring = () => {

        let token = getLocalStorage("token");

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };

        fetch(`${path}participants/${props.id}/score`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setScore(result);
                setLoading(false);
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    React.useEffect(() => {
        getScoring();
    }, []);

    if (loading) {
        return (
            <Skeleton variant="rect" className={classes.skeleton} />
        );
    } else {
        return (
            <TableContainer component={props.component} className={classes.area}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{strings.quests}</TableCell>
                            <TableCell align="right">{strings.points}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {score.scorings.sort((a,b)=> b.points - a.points).map((row) => (
                            <TableRow key={row.title}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.points}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow key="All">
                            <TableCell component="th" scope="row">
                                <Typography color="primary">
                                    {strings.totalPoints}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography color="primary">
                                    {score.points}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}