import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { deleteCookie } from "../../Cookie"
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DonateButton from './DonateButton';
import { strings } from '../../localization'

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
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    // [theme.breakpoints.up('sm')]: {
    //   // width: `calc(100% - ${drawerWidth}px)`,
    //   // marginLeft: drawerWidth,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(-7),
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(-7),
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(-9),
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(-9),
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

//Компенет, заменяющий ListItem, чтоб можно было просто указать путь ссылки

function ListItemLink(props) {

  const { icon, primary, to, onClick } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <Link href={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink} onClick={onClick}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    deleteCookie("refreshToken");
    deleteCookie("id");
    deleteCookie("groupId");
    deleteCookie("name");
    deleteCookie("token");
    deleteCookie("email");
    // history.replace("/login/owner");
    // document.location.reload(true);
  }


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

        <ListItemLink
          to={"/groups"}
          icon={<Icon color="primary">people_alt</Icon>}
          primary={strings.myGroups} />

        <ListItemLink
          to={"/pending-quests"}
          icon={<Icon color="primary">hourglass_full</Icon>}
          primary={strings.pendQuests} />

      </List>
      <Divider />
      <List>
        <ListItemLink
          to={"/settings"}
          icon={<Icon color="primary">settings</Icon>}
          primary={strings.settings} />

        <ListItemLink
          to={"/help"}
          icon={<Icon color="primary">help</Icon>}
          primary={strings.help} />

        {/* <ListItem button key="Help">
          <ListItemIcon>
            <Icon color="primary">help</Icon>
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem> */}

        <ListItemLink
          to={"/login/owner"}
          icon={<Icon color="primary">exit_to_app</Icon>}
          primary={strings.logOut}
          onClick={logout}
        />
      </List>
      <Divider />
      <List>
        <DonateButton></DonateButton>
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
            Questerium
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              className={classes.icons}
              edge="end"
              aria-label="change language"
              aria-controls="lang"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <Icon>translate</Icon>
            </IconButton>
            <Menu
              id="lang"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem value={"Russian"} onClick={handleClose}>Russian</MenuItem>
              <MenuItem value={"English"} onClick={handleClose}>English</MenuItem>
            </Menu>
            <IconButton className={classes.icons} edge="end" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Icon>notifications</Icon>
              </Badge>
            </IconButton>
            <IconButton
              href="/settings"
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
            onOpen={handleDrawerToggle}
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
            onClose={handleDrawerToggle}
          // onOpen={handleDrawerToggle}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;