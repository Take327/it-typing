import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TypingArea from '../TypingArea/TypingArea'
import getDefault from '../../util/getDefault';
import { getUserTexts } from '../../util/loginUserFunc/getUserTexts'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

type TypingText = {
    id: number,
    originalText: string,
    kanaText: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

type Props = {
    loginStatus: boolean
}

const TypingPage: React.FC<Props> = ({ loginStatus }) => {
    const classes = useStyles();
    const [typing, setTyping] = useState<TypingText[]>([]);
    const [loadStatus, setLoadStatus] = useState<boolean>(false);

    const initialTyping = (json: TypingText[] | undefined) => {
        if (json !== undefined) {
            setTyping(json)
        }
    }

    useEffect(() => {
        if (!loadStatus) {

            if (loginStatus) {
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
            {(() => {
                if (loadStatus) {
                    return <TypingArea typingText={typing} />
                }
            })()}

            <Backdrop className={classes.backdrop} open={!loadStatus}>
                <CircularProgress color="inherit" />
            </Backdrop>

        </>

    )
}

export default TypingPage;