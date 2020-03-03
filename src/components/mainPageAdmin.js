import React from 'react';
import ResponsiveDrawer from "./ResponsiveDrawer";
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from "./card";
import Leadboard from "./leadboard";
import { green } from '@material-ui/core/colors';
import Settings from "./settings";
import NoMatch from "./NoMatch";
import Donate from "./donate";
import GroupId from "./groupID"
import { Grid, Button } from '@material-ui/core';
import LeadboardMain from "./leadboardMain";
import { getCookie, deleteCookie } from "../Cookie"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
        leadboard: {
            // width: theme.spacing(75),
            width: `calc(100% - ${50}px)`,
            height: theme.spacing(70),
            marginLeft: theme.spacing(0),
        },
    },
    [theme.breakpoints.up('md')]: {
        leadboard: {
            width: theme.spacing(75),
            height: theme.spacing(70),
            marginLeft: theme.spacing(0),
        },
    },
    [theme.breakpoints.up('lg')]: {
        leadboard: {
            width: theme.spacing(75),
            height: theme.spacing(70),
            marginLeft: theme.spacing(75),
        },
    },
    // leadboard:{
    //     width: theme.spacing(75),
    //     height: theme.spacing(70),
    //     marginLeft: theme.spacing(75),
    // },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
}));


const path = "http://localhost:8080";


// const checkToken = () => {

//     let history = useHistory();

//     var myHeaders = new Headers();

//     myHeaders.append("Content-Type", "application/json");

//     let cookie = getCookie("refreshToken");

//     alert(cookie);

//     var raw = JSON.stringify({ "refreshToken": cookie });

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     fetch(path + "/login/owner", requestOptions)
//         .then(response => {
//             if (response.status === 401) {
//                 console.log("Authorization error");
//                 alert("Время сессии истекло, войдите заново.");
//                 history.push("/login/owner");
//                 // enqueueSnackbar("Время сессии истекло, войдите заново.", {
//                 //   variant: 'error',
//                 // });
//                 return;
//             }
//             return response.json();
//         })
//         .then(json => {
//             if (json === undefined) {
//                 return;
//             } else {
//                 console.dir(json.refreshToken);
//                 alert(document.cookie + ` Вы вошли как ${json.owner.name}`);
//                 // enqueueSnackbar(`Вы вошли как ${json.owner.name}`, {
//                 //   variant: 'success',
//                 // });
//             }
//         })
//         .catch(console.log);
// }

// checkToken();


//     response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

function MyGroups() {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={5} >
                <Grid item >
                    <MediaCard />
                </Grid>
                <Grid item className={classes.leadboard}>
                    <LeadboardMain />
                </Grid>
            </Grid>
        </main>
    );
}


export default function MainPageAdmin() {

    const classes = useStyles();

    let history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const checkToken = () => {

        let cookie = getCookie("refreshToken");

        if(cookie === undefined){
            history.push("/login/owner");
            enqueueSnackbar("Время сессии истекло, войдите заново.", {
              variant: 'error',
            });
        }

        console.dir(document.cookie);
    
        // var myHeaders = new Headers();
    
        // myHeaders.append("Content-Type", "application/json");
    
        // var raw = JSON.stringify({"refreshToken": cookie});
    
        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
    
        // fetch("http://localhost:8080/login/owner", requestOptions)
        //     .then(response => {
        //         if (response.status === 401) {
        //             console.log("Authorization error");
        //             // alert("Время сессии истекло, войдите заново.");
        //             history.push("/login/owner");
        //             enqueueSnackbar("Время сессии истекло, войдите заново.", {
        //               variant: 'error',
        //             });
        //             return;
        //         }
        //         return response.json();
        //     })
        //     .then(json => {
        //         if (json === undefined) {
        //             return;
        //         } else {
        //             console.dir(json.refreshToken + 'SUCCES');
        //             // alert(document.cookie + ` Вы вошли как ${json.owner.name}`);
        //             // enqueueSnackbar(`Вы вошли как ${json.owner.name}`, {
        //             //   variant: 'success',
        //             // });
        //         }
        //     })
        //     .catch(console.log);
    }

    const deleteC = () =>{
        deleteCookie("refreshToken");
    }

    checkToken();

    return (
        <Router>
            <div className={classes.root}>
                <ResponsiveDrawer />
                <Switch>
                    <Route exact path="/groups" component={MyGroups} />
                    <Route exact path="/settings" component={Settings} />
                    <Route path="/group" component={GroupId} />
                    <Route path="*" component={NoMatch} />
                </Switch>
                {/* <Button onClick={deleteC}>
                    DELETE COOKIE
                    </Button> */}
            </div>
            {/* <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={5} >
                    <Grid item >
                        <MediaCard />
                    </Grid>
                    <Grid item >
                        <Leadboard />
                    </Grid>
                </Grid>
                <MediaCard />
                <Leadboard />
            </main> */}
        </Router>
    );
}