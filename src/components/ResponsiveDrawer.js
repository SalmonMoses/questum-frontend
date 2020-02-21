import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  icons: {
    marginRight: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    marginTop: theme.spacing(-7),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  grow: {
    flexGrow: 1,
  },
}));


function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const menuId = 'primary-search-account-menu';


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.title}>
        <Typography component="div" color="primary">
          <Box fontSize="h4.fontSize" m={1}>
            Questerium
        </Box>
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button key="My account">
          <ListItemIcon>
            <Icon color="primary">account_box</Icon>
          </ListItemIcon>
          <ListItemText primary={<Typography color="primary">My account</Typography>} />
        </ListItem>

        <ListItem button key="My groups">
          <ListItemIcon>
            <Icon color="primary">people_alt</Icon>
          </ListItemIcon>
          <ListItemText primary="My groups" />
        </ListItem>

        <ListItem button key="Pending quests">
          <ListItemIcon>
            <Icon color="primary">hourglass_full</Icon>
          </ListItemIcon>
          <ListItemText primary="Pending quests" />
        </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button key="Account settings">
          <ListItemIcon>
            <Icon color="primary">settings</Icon>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button key="Help">
          <ListItemIcon>
            <Icon color="primary">help</Icon>
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>

        <ListItem button key="Log out">
          <ListItemIcon>
            <Icon color="primary">exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Donate">
          <ListItemIcon>
            <Icon color="primary">monetization_on</Icon>
          </ListItemIcon>
          <ListItemText primary="Donate" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" noWrap>
          Questerium - круто, стильно и по новому!
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton
          className={classes.icons}
            edge="end"
            aria-label="change language"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <Icon>translate</Icon>
          </IconButton>
          <IconButton className={classes.icons} edge="end" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <Icon>notifications</Icon>
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <Icon>account_circle</Icon>
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{

              
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <SwipeableDrawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;