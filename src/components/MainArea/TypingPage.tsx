import React from 'react';
import TypingArea from '../TypingArea/TypingArea'

type Props = {
    originalText: string,
    kanaText: string
}[]

const TypingPage = (props: any) => {

    console.log(props.typingText)
    return (
        <TypingArea typingText={props.typingText} />

    )
}

export default TypingPage;