import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '40px',
            width: '40px'
        },
        shift: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '40px',
            width: '80px'
        },
        tab: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '40px',
            width: '60px'
        },
        space: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '40px',
            width: '220px'
        },
        caps: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '40px',
            width: '70px'
        },
        ctrl: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '40px',
            width: '50px'
        },
    }),
);



type Props = {
    keyValue: string
}

const KeyButtonNormal: React.FC<Props> = ({ keyValue }) => {
    const classes = useStyles();

    const keyHandle = (keyValue: string) => {
        switch (keyValue) {
            case 'shift':
                return <Paper className={classes.shift}>{keyValue}</Paper>

            case 'tab':
                return <Paper className={classes.tab}>{keyValue}</Paper>

            case 'space':
                return <Paper className={classes.space}>{keyValue}</Paper>

            case 'caps':
                return <Paper className={classes.caps}>{keyValue}</Paper>

            case 'ctrl':
                return <Paper className={classes.ctrl}>{keyValue}</Paper>



            default:
                return <Paper className={classes.paper}>{keyValue}</Paper>
        }
    }

    return (
        <div>
            {keyHandle(keyValue)}
        </div>
    )
}

export default KeyButtonNormal;