import React, { useState, useEffect } from 'react';
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
    const [backGroundColor, setBackGroundColor] = useState('#FFF');


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

    const handleChange = () => {


        console.log('a');
        setBackGroundColor('#81d8d0');
    }

    const keyHandle = (keyObject: KeyObject) => {
        const code = keyObject.keyCode;
        const value = keyObject.keyValue
        switch (value) {
            case 'shift':
                return <Paper id={code + '_button'} className={classes.shift}>{value}</Paper>

            case 'Tab':
                return <Paper id={code + '_button'} className={classes.tab}>{value}</Paper>

            case 'space':
                return <Paper id={code + '_button'} className={classes.space}>{value}</Paper>

            case 'caps':
                return <Paper id={code + '_button'} className={classes.caps}>{value}</Paper>

            case 'ctrl':
                return <Paper id={code + '_button'} className={classes.ctrl}>{value}</Paper>

            case 'Enter':
                return <Paper id={code + '_button'} className={classes.enter}>{value}</Paper>

            default:
                return <Paper id={code + '_button'} className={classes.paper}>{value}</Paper>
        }
    }

    return (
        <div className="key_button" onClick={(e) => handleChange()}>
            {keyHandle(keyObject)}
        </div>
    )
}

export default KeyButtonNormal;