import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './KeyButton.css';

type Props = {
    keyObject: {
        keyCode: string,
        keyValue: string
    }
}

type KeyObject = {
    keyCode: string,
    keyValue: string
}

const KeyButtonNormal: React.FC<Props> = ({ keyObject }) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
                height: '40px',
                width: '40px',
                backgroundColor: '#FFF'

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
                width: '65px'
            },
            enter: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
                height: '90px',
                width: '90px'
            }
        }),
    );
    const classes = useStyles();

    const keyHandle = (keyObject: KeyObject) => {
        const code = keyObject.keyCode;
        const value = keyObject.keyValue
        switch (value) {
            case 'shift':
                return <Paper id={'_button'} className={classes.shift}></Paper>

            case 'Tab':
                return <Paper id={'_button'} className={classes.tab}></Paper>

            case 'space':
                return <Paper id={'_button'} className={classes.space}></Paper>

            case 'caps':
                return <Paper id={'_button'} className={classes.caps}></Paper>

            case 'ctrl':
                return <Paper id={'_button'} className={classes.ctrl}></Paper>

            case 'Enter':
                return <Paper id={'_button'} className={classes.enter}></Paper>

            default:
                return <Paper id={code + '_button'} className={classes.paper}>{value}</Paper>
        }
    }

    return (
        <div className="key_button">
            {keyHandle(keyObject)}
        </div>
    )
}

export default KeyButtonNormal;