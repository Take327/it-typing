import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TypingArea from '../TypingArea/TypingArea'
import getDefault from '../../util/getDefault';
import { getUserTexts } from '../../util/loginUserFunc/getUserTexts'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
import { State } from '../../reducks/store/types'
import { getUserLoginState } from '../../reducks/user/selectors'



type TypingText = {
    id: number,
    originalText: string,
    kanaText: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    card: {
        width: '100%',
        height: '70vh'
    }
}));

const TypingPage: React.FC = () => {
    const classes = useStyles();
    const [typing, setTyping] = useState<TypingText[]>([]);
    const [loadStatus, setLoadStatus] = useState<boolean>(false);
    const loginState = getUserLoginState(useSelector((state: State) => { return state }))


    const initialTyping = (json: TypingText[] | undefined) => {
        if (json !== undefined) {
            setTyping(json)
        }
    }

    useEffect(() => {
        if (!loadStatus) {

            if (loginState) {
                getUserTexts().then((data) => {
                    initialTyping(data)
                    setLoadStatus(true)
                });
            } else {
                getDefault().then(json => {
                    initialTyping(json)
                    setLoadStatus(true)
                });
            }
        }
    });

    return (
        <>
            <Hidden xsDown implementation="css">

                {(() => {
                    if (loadStatus) {
                        return <TypingArea typingText={typing} />
                    }
                })()}
                <Backdrop className={classes.backdrop} open={!loadStatus}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Hidden>

            <Hidden smUp implementation="css">
                <Card className={classes.card}>

                    <CardContent>
                        <Typography variant="body1" component="p">
                            タイピング練習はPCからのアクセスのみ対応しています。
                        </Typography>
                    </CardContent>
                </Card>
            </Hidden>



        </>

    )
}

export default TypingPage;