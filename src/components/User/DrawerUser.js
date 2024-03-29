import React, { useEffect } from 'react';
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
import { deleteFromLocalStorage, clearLocalStorage, setLocalStorage } from "../../Cookie"
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DonateButton from '../MainComponents/DonateButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from "react-router-dom";
import { NotificationsParticipants } from './NotificationsParticipants'
import { strings } from "../../localization"

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
            marginTop: theme.spacing(-9),
        },
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(-9),
        },
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(-9),
        },
    },
    //   sectionDesktop: {
    //     display: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //       display: 'flex',
    //     },
    //   },
    grow: {
        flexGrow: 1,
    },
    navigation: {
        [theme.breakpoints.down('xs')]: {
            position: "fixed",
            bottom: theme.spacing(0),
            width: "100%",
            zIndex: theme.zIndex.drawer + 1,
        },
        // position: "absolute",
        // width: "100%",
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

    const [value, setValue] = React.useState(0);

    let history = useHistory();

    useEffect(() => {
        const updateValue = () => {
            console.log(history.location.pathname.slice(6));

            switch (history.location.pathname.slice(6)) {
                case "settings":
                    setValue(3);
                    break;
                case "group":
                    setValue(2);
                    break;
                case "me":
                    setValue(0);
                    break;
                case "quests":
                    setValue(1);
                    break;
                default:
                    setValue(3);
                    break;
            }
        }
        updateValue();
    }, [history.location.pathname])

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
        clearLocalStorage();
    }

    const changeLanguage = (lang) =>{
        strings.setLanguage(lang);
        setLocalStorage('lang', lang);
        handleClose();
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
                    to={"/user/me"}
                    icon={<Icon color="primary">account_circle</Icon>}
                    primary={strings.profile} />

                <ListItemLink
                    to={"/user/quests"}
                    icon={<Icon color="primary">assignment</Icon>}
                    primary={strings.quests_participant} />

                <ListItemLink
                    to={"/user/group"}
                    icon={<Icon color="primary">people_alt</Icon>}
                    primary={strings.group} />

            </List>
            <Divider />
            <List>
                <ListItemLink
                    to={"/user/settings"}
                    icon={<Icon color="primary">settings</Icon>}
                    primary={strings.settings} />

                <ListItemLink
                    to={"/user/help"}
                    icon={<Icon color="primary">help</Icon>}
                    primary={strings.help} />

                <ListItemLink
                    to={"/login/user"}
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
                    <Typography variant="h6" noWrap>
                        Questerium
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <NotificationsParticipants />
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
                            <MenuItem value={"Russian"} onClick={() => changeLanguage('ru')}>Russian</MenuItem>
                            <MenuItem value={"English"} onClick={() => changeLanguage('en')}>English</MenuItem>
                            <MenuItem value={"Ukrainian"} onClick={() => changeLanguage('ua')}>Ukrainian</MenuItem>
                        </Menu>
                        <IconButton
                            href="/user/settings"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Icon>settings</Icon>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <BottomNavigation
                    value={value}
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    // }}
                    showLabels
                    className={classes.navigation}
                >

                    <BottomNavigationAction href="/user/me" label={strings.profile} icon={<Icon>account_circle</Icon>} />
                    <BottomNavigationAction href="/user/quests" label={strings.quests_participant} icon={<Icon>list</Icon>} />
                    <BottomNavigationAction href="/user/group" label={strings.group} icon={<Icon>group</Icon>} />
                </BottomNavigation>
                <Hidden xsDown implementation="css">
                    <SwipeableDrawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                        onClose={handleDrawerToggle}
                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default ResponsiveDrawer;