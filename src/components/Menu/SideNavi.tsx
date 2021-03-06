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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../reducks/store/types'
import { getUserLoginState } from '../../reducks/user/selectors'
import { logout } from '../../reducks/user/operations'

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

    })
);



type Props = {
    openState: boolean,
    handleDrawerToggle: Function
}


export const NaviMenu: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const selector = useSelector((state: State) => { return state })
    const current = {
        color: 'blue',
        textDecoration: 'underline',
    };

    const handleLogoutClick = () => {
        dispatch(logout());
    }

    return (
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

                <NavLink exact to='/contact' activeStyle={current}>
                    <ListItem button key={'お問い合わせ'}>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={'お問い合わせ'} />
                    </ListItem>
                </NavLink>

                {(() => {
                    if (!getUserLoginState(selector)) {
                        return (
                            <NavLink exact to='/Login' activeStyle={current}>
                                <ListItem button key={'ログイン'}>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'ログイン'} />
                                </ListItem>
                            </NavLink>
                        )
                    } else {
                        return (
                            <NavLink exact to='/' activeStyle={current} onClick={handleLogoutClick}>
                                <ListItem button key={'ログアウト'}>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'ログアウト'} />
                                </ListItem>
                            </NavLink>
                        )
                    }
                })()}

            </List>
            <Divider />
        </div>
    )
}

const SideNavi: React.FC<Props> = ({ openState, handleDrawerToggle }) => {
    const classes = useStyles();

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
                    <NaviMenu />
                </Drawer>
            </Hidden>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    open={openState}
                    onClose={() => handleDrawerToggle()}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <NaviMenu />
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default SideNavi;