import React, { useState, useEffect } from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import TextProcess from './util/TextProcess'
import { Sentence } from 'typing-ja';


const TypingArea = () => {

    const [originalText, setOriginalText] = useState('犬も歩けば棒に当たる');
    const [kanaText, setKanaText] = useState('いぬもアルケバStickにあたる');

    const sentence = new Sentence(kanaText);
    const challenge = sentence.newChallenge();

    const [typedText, setTypedText] = useState(challenge.typedRoman);
    const [remainingText, setRemainingText] = useState(challenge.remainingRoman)

    const typingAction = (key) => {
        challenge.input(key);
        setTypedText(challenge.typedRoman);
        setRemainingText(challenge.remainingRoman)
    }

    useEffect(() => {

        document.onkeydown = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#81d8d0';
            }

            typingAction(event.key);
        }
        document.onkeyup = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#FFF';
            }
        }
    }, []);



    return (
        <div className='typing_area'>
            <TextArea originalText={originalText} kanaText={kanaText} typedText={typedText} remainingText={remainingText} />
            <Keyboard />
        </div>
    )
}

export default TypingArea