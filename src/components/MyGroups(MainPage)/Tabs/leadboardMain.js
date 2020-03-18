import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Quests from "./Quests/quests"
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import AddMember from "./GroupMembers/addMember"
import { useHistory } from "react-router-dom";
import AddQuest from "./Quests/addQuest"
import { getCookie } from "../../../Cookie"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteMember from "./GroupMembers/deleteMember";
import Paper from "@material-ui/core/Paper"
import {path} from "../../consts"

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
    top: 580,
    right: 90,
  },
  button: {
    marginLeft: 10,
  },
  box: {
    margin: theme.spacing(0.3),
    minHeight: theme.spacing(70),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  shadow: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  card: {
    width: theme.spacing(75),
    maxHeight: '100%',
  }
}));

export default function Leadboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
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
    console.log(history.location.search);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = () => {
    console.log(history.location.search.slice(4));
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [values, setValues] = useState([]);

  const [valuesLast, setValuesLast] = useState([]);

  const [valuesQuests, setValuesQuests] = useState([]);

  const [valuesLastQuests, setValuesLastQuests] = useState([]);

  const [url, setUrl] = useState("");

  console.log(history.location.search.slice(4))

  const refresh = () => {
    setValuesLast(values);
    setValuesLastQuests(valuesQuests);
    console.log("refreshhhhhh.......");
  }


  console.log("url: " + url)
  console.log("path: " + history.location.search.slice(4))
  if (url !== history.location.search.slice(4)) {
    refresh()
    setUrl(history.location.search.slice(4))
  }

  useEffect(() => {

    const fetchDataMembers = async () => {

      let id = getCookie("groupId");
      console.log("Cookie id: " + id);
      if (history.location.search.slice(4) !== "") {
        id = history.location.search.slice(4);
      }
      console.log("ID: " + id);

      let token = getCookie("token");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };

      await fetch(`${path}groups/${id}/participants`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setValues(result);
        })
        .catch(error => console.log('error', error));
    }

    const fetchDataQuests = async () => {

      let id = getCookie("groupId");
      console.log("Cookie id: " + id);
      if (history.location.search.slice(4) !== "") {
        id = history.location.search.slice(4);
      }
      console.log("ID: " + id);

      let token = getCookie("token");
      var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };

      fetch(`${path}groups/${id}/quests`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setValuesQuests(result)
        })
        .catch(error => console.log('error', error));
    }
    fetchDataMembers();
    fetchDataQuests();
  }, [history.location.search, valuesLast, valuesLastQuests]);

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
    // {
    //   color: 'inherit',
    //   className: clsx(classes.fab, classes.fabGreen),
    //   icon: <Icon>keyboard_arrow_up</Icon>,
    //   label: 'Expand',
    // },
  ];


  return (
    <Paper className={classes.root} >
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
          <div className={classes.margin} >
            <List>
              {values.map((item, count) => (
                <ListItem key={count} fullWidth >
                  <DeleteMember name={item.name} points={item.points} email={item.email} refresh={() => refresh()} id={item.id} />
                </ListItem>
              ))}
            </List>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box component="div" className={classes.margin} display="block">
            {valuesQuests.map((item, count) => (
              <ListItem key={count} fullWidth>
                <Quests title={item.title} refresh={() => refresh()} id={item.id} />
              </ListItem>
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className={classes.margin}>
            {values.sort((a, b) => b.points - a.points).map((item, count) => (
              <ListItem key={count} fullWidth >
                <DeleteMember name={item.name} points={item.points} email={item.email} refresh={() => refresh()} id={item.id} />
              </ListItem>
            ))}
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
      <AddQuest open={openEdit} onClick={handleCloseEdit} onClose={handleCloseEdit} refresh={() => refresh()} />
      <AddMember open={open} onClick={handleClose} onClose={handleClose} refresh={() => refresh()} />
    </Paper>
  );
}