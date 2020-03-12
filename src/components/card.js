import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import GroupPaper from './groupPaper';
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import { getCookie } from "../Cookie"
import AddGroup from "./addGroup"

const useStyles = makeStyles(theme => ({
  [theme.breakpoints.down('sm')]: {
    root: {
      width: theme.spacing(75),
      height: theme.spacing(70),
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%',
      overflow: 'auto'
    },
  },
  [theme.breakpoints.up('md')]: {
    root: {
      width: theme.spacing(75),
      height: theme.spacing(70),
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%',
      overflow: 'auto'
    },
  },
  [theme.breakpoints.up('lg')]: {
    root: {
      position: "fixed",
      Top: 200,
      Left: 30,
      width: theme.spacing(75),
      height: theme.spacing(70),
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%',
      overflow: 'auto'
    },
  },
  text: {
    marginTop: theme.spacing(15)
  },
  refresh:{
    marginRight: theme.spacing(-65),
    marginTop: theme.spacing(-7)
  },
  addGroup:{
    marginBottom:theme.spacing(5),
  }
}));

// function FormDialog(props) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//     props.onClick();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     props.onClick();
//   };

//   const [values, setValues] = useState({
//     name: "",
//   });

//   const handleChange = prop => event => {
//     setValues({ ...values, [prop]: event.target.value })
//   }

//   let token = getCookie("token");

//   const handleClick = async () => {

//     var myHeaders = new Headers();

//     myHeaders.append("Content-Type", "application/json");

//     myHeaders.append("Authorization", "Bearer " + token);

//     var raw = JSON.stringify({ "name": values.name });

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };

//     await fetch("http://localhost:8088/groups", requestOptions)
//       .then(response => response.text())
//       .then(result => {
//         console.log(result)
//       })
//       .catch(error => console.log('error', error));
//     handleClose();
//     props.onClick();
//   }

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Create new group
//       </Button>
//       <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Create</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Enter a name of your new group.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Group Name"
//             type="name"
//             fullWidth
//             value={values.name}
//             onChange={handleChange("name")}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={() => handleClick()} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

export default function MediaCard(props) {
  const classes = useStyles();

  const [values, setValues] = useState([]);
  const [valuesLast, setValuesLast] = useState([]);

  console.log("done")

  const refresh = () => {
    setValuesLast(values);
    console.log("refreshhhhhh.......");
  }

  window.onload = function(){ refresh()}


  useEffect(() => {

    const fetchData = async () => {
      let token = getCookie("token");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      await fetch(`http://localhost:8088/owners/${getCookie("id")}/groups`, requestOptions)
        .then(response => response.json())
        .then(data => {
          // if (data === valuesLast) {
          //   console.log("======");
          //   return fetchData();
          // } else {
          console.log(data);
          setValues(data);
          // setValuesLast({ "groups": data })
          // }
        })
        .catch(err => console.log(err));
    }
    fetchData();
  }, [valuesLast]);

  console.log(values[0]);

  return (
    <Card className={classes.root}>
      <CardContent >
        <Typography variant="h6">
          Your groups:
        </Typography>
      </CardContent>
      <IconButton className={classes.refresh} aria-label="edit" onClick={refresh} style={{"marginLeft": 0}}>
          <Icon color="primary">cached</Icon>
        </IconButton>
      {/* <Button id="elemm" onClick={refresh} variant="contained" color="primary">refresh</Button> */}
      <List dense="true">
        {values.map((item, count) => (
          <ListItem key={count} >
            <GroupPaper name={item.name} id={item.id} refresh={() => refresh()} />
          </ListItem>
        ))}
      </List>
      <AddGroup onClick={() => refresh()}/>
      <div className={classes.addGroup}>
      </div>
      {/* <Typography>
        Questerium
      </Typography> */}
    </Card>
  );
}