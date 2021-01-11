import React from 'react';
import KeyButtonNormal from './KeyButtonNormal'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

type Props = {
    lineCode: number
}

type KeyLineValues = string[][]

const keyLineValues: KeyLineValues = [
    ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "\\", ""],
    ["", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "@", "["],
    ["", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", ":", "]"],
    ["", "Z", "X", "X", "C", "V", "B", "N", "M", ",", ".", "/", "\\"],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);


const KeyLine: React.FC<Props> = ({ lineCode }) => {
    const classes = useStyles();
    return (
        <div className="key-line">
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {keyLineValues[lineCode].map((value, index) => {
                        return <KeyButtonNormal keyValue={value} key={index} />
                    })}
                </Grid>
            </div>
        </div>
    )
}

export default KeyLine;