import React from 'react';
import { Typography } from '@material-ui/core';
import TypingArea from '../TypingArea/TypingArea'


const TypingPage = () => {
    return (
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', alignContent: 'center',marginTop:'50px' }} >
            <TypingArea />
        </Typography>
    )
}

export default TypingPage;