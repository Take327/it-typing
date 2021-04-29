import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        marginTop: theme.spacing(10),
        width: '70vw',
    },
    header: {
        textAlign: "center",
        background: "#81d8d0",
        color: "#fff"
    },
    cardContent: {
        display: "flex",
        flexFlow: "column"
    }
}))

const Top: React.FC = () => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
                tesuto
        </Card>
    )
}

export default Top