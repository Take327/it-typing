import React from 'react';
import KeyButtonNormal from './KeyButtonNormal'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Height } from '@material-ui/icons';

type Props = {
    lineCode: number
}

type KeyLineValues = string[][]

const keyLineValues: KeyLineValues = [
    ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "\\", "caps"],
    ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "@", "["],
    ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", ":", "]"],
    ["shift", "Z", "X", "X", "C", "V", "B", "N", "M", ",", ".", "/", "\\", "shift"],
    ["caps", "", "", "", "space", "", "", "", "ctrl", "", ""]
]


const KeyLine: React.FC<Props> = ({ lineCode }) => {
    return (
        <div>
            {keyLineValues[lineCode].map((value, index) => {
                return <KeyButtonNormal keyValue={value} key={index} />
            })}
        </div>
    )
}

export default KeyLine;