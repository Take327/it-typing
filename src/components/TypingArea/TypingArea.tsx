import React, { useState, useEffect } from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import TextProcess from './util/TextProcess'

type TargetTextObject = {
    originalText: string,
    kanaText: string
}

const TypingArea: React.FC = () => {

    const [targetTextObject, setTargetTextObject] = useState<TargetTextObject>({
        originalText: '犬も歩けば棒に当たる',
        kanaText: 'いぬもあるけばぼうにあたる'
    })

    const text = new TextProcess(targetTextObject.kanaText);
    const romeText = 'test'//text.remainingRoman;

    useEffect(() => {

        document.onkeydown = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#81d8d0';
            }

            console.log(text.input(event.key));
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
            <TextArea originalText={targetTextObject.originalText} kanaText={targetTextObject.kanaText} romeText={romeText} />
            <Keyboard />
        </div>
    )
}

export default TypingArea