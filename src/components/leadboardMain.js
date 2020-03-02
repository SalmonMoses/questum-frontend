import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MemberPaper from "./member"
import Quests from "./quests"
import clsx from 'clsx';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import AddMember from "./addMember"
import AddSubQuest from "./addSubQuest"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: theme.spacing(75),
    minHeight: theme.spacing(70),
    maxHeight: '100%',
    overflow: 'auto'
  },
  margin: {
    marginTop: theme.spacing(-1),
  },
  fab: {
    position: "fixed",
    top: 590,
    right: 75,
  },
  button: {
    marginLeft: 10,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

function CreateQuest() {

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
        Create new quest
      </Button>
      <Dialog open={open} fullWidth onClose={handleClose} maxWidth={"sm"} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a title.
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
            create
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function Leadboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const arr = [];
  for (let i = 0; i < 17; i++) {
    arr.push(<MemberPaper />);
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <Icon>add</Icon>,
      label: 'Add',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <Icon>edit</Icon>,
      label: 'Edit',
    },
    {
      color: 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <Icon>keyboard_arrow_up</Icon>,
      label: 'Expand',
    },
  ];


  return (
    <div className={classes.root} >
      <AppBar position="sticky" color="default" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Members" {...a11yProps(0)} />
          <Tab label="Quests" {...a11yProps(1)} />
          <Tab label="Leaderboard" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} >
          <div className={classes.margin}>
            {arr.map((elem) => (
              elem
            ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className={classes.margin}>
            <Quests />
            <CreateQuest className={classes.button} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className={classes.margin}>
            <MemberPaper />
          </div>
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={fab.label === "Add" ? handleClickOpen : handleClickOpenEdit}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
      <AddSubQuest open={openEdit} onClick={handleCloseEdit} onClose={handleCloseEdit} />
      <AddMember open={open} onClick={handleClose} onClose={handleClose} />
    </div>
  );
}