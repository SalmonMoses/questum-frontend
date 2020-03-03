import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GroupPaper from './groupPaper';

const useStyles = makeStyles(theme => ({
  [theme.breakpoints.down('sm')]: {
    root: {
      width: theme.spacing(75),
      height: theme.spacing(70),
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    },
  },
  // root: {
  //   position: "fixed",
  //   Top: 200,
  //   Left: 30,
  //   width: theme.spacing(75),
  //   height: theme.spacing(70),
  //   backgroundColor: theme.palette.background.paper,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  text: {
    marginTop: theme.spacing(15)
  },
}));

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new group
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name of your new group.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent >
        <Typography variant="h6">
          Your groups:
        </Typography>
      </CardContent>
      <GroupPaper />
    {/* <GroupPaper />
    <GroupPaper />
    <GroupPaper /> */}
      <CardContent className={classes.text}>
        <Typography variant="h4">
          You have no groups yet
        </Typography>
      </CardContent>
      <FormDialog />
    </Card>
  );
}