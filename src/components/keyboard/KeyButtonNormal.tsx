import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);


type Props = {
    keyValue: string
}

const KeyButtonNormal: React.FC<Props> = ({ keyValue }) => {
    const classes = useStyles();
    return (
            <Grid item xs={6} sm={"auto"}>
                <Paper className={classes.paper}>{keyValue}</Paper>
            </Grid>
    )
}

export default KeyButtonNormal;