import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
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

    }),
);

const SideMenu = () => {
    const classes = useStyles();

    const current = {
        color: 'blue',
        textDecoration: 'underline',
    };

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <div className={classes.toolbar} >
                        <Divider />
                        <List>
                            <NavLink exact to='/' activeStyle={current}>
                                <ListItem button key={'ホーム'}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'ホーム'} />
                                </ListItem>
                            </NavLink>

                            <NavLink exact to='/typing' activeStyle={current}>
                                <ListItem button key={'タイピング'}>
                                    <ListItemIcon>
                                        <KeyboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'タイピング'} />
                                </ListItem>
                            </NavLink>

                            <NavLink exact to='/TextRegistration' activeStyle={current}>
                                <ListItem button key={'テキスト登録'}>
                                    <ListItemIcon>
                                        <SaveIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'テキスト登録'} />
                                </ListItem>
                            </NavLink>
                        </List>
                        <Divider />
                    </div>
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default SideMenu;