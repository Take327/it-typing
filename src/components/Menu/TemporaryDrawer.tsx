import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideNavi from './SideNavi';
import Header from './Header'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        toolbar: theme.mixins.toolbar,

        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

interface Props {
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <SideNavi />

            <main className={classes.content}>
                <div className={classes.toolbar} />

            </main>
        </div>
    );
}