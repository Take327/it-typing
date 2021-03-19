import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import getDefault from '../../util/getDefault';


const TextRegistration = () => {
    useEffect(() => {
        getDefault().then(json => console.log(json))
    });

    return (
        <div>
            テキスト登録
        </div>
    )
}

export default TextRegistration