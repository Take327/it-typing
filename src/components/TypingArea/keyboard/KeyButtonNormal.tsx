import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './KeyButton.css';



const keyDownEventActionHandle = (event: any) => {
    console.log(event);
}



type Props = {
    keyValue: string
}

const KeyButtonNormal: React.FC<Props> = ({ keyValue }) => {
    const [backGroundColor, setBackGroundColor] = useState('#FFF');

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
                height: '40px',
                width: '40px',
                backgroundColor: backGroundColor

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

            case 'enter':
                return <Paper className={classes.enter}>{keyValue}</Paper>

            default:
                return <Paper className={classes.paper}>{keyValue}</Paper>
        }
    }

    return (
        <div className="key_button" onClick={(e) => handleChange()}>
            {keyHandle(keyValue)}
        </div>
    )
}

export default KeyButtonNormal;