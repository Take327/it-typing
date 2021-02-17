import React, { useState, useEffect, useReducer } from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import { Sentence } from 'typing-ja';


const TypingArea = () => {

    const reducerFunc = (countState) => {
        return countState + 1;
    }

    const [count, dispatch] = useReducer(reducerFunc, 0);


    const typingTexts = [
        { originalText: '犬も歩けば棒に当たる', kanaText: 'いぬもあるけばぼうにあたる' },
        { originalText: '猫に小判', kanaText: 'ねこにこばん' },
        { originalText: '豚に真珠', kanaText: 'ぶたにしんじゅ' },
        { originalText: '石の上にも三年', kanaText: 'いしのうえにもさんねん' },
    ];

    const typingInstances = typingTexts.map((value, index) => {
        return new Sentence(value.kanaText);
    });

    const challenges = typingInstances.map((sentence) => {
        return sentence.newChallenge();
    })


    const [originalText, setOriginalText] = useState(typingTexts[count].originalText);
    const [kanaText, setKanaText] = useState(typingTexts[count].kanaText);


    const [typedText, setTypedText] = useState(challenges[count].typedRoman);
    const [remainingText, setRemainingText] = useState(challenges[count].remainingRoman);


    const nextText = (count) => {
        console.log(count);
        setOriginalText(typingTexts[count].originalText);
        setKanaText(typingTexts[count].kanaText);

        setTypedText(challenges[count].typedRoman);
        setRemainingText(challenges[count].remainingRoman);

    }

    const typingAction = (key) => {
        if (challenges[count].input(key)) {
            setTypedText(challenges[count].typedRoman);
            setRemainingText(challenges[count].remainingRoman);
            if (challenges[count].isCleared()) {
                dispatch();
            }
        } else {
            document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 0, 0)';
            setTimeout(() => { document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 255, 255)' }, 25);
        }

    }

    useEffect(() => {
        nextText(count);
        document.onkeydown = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#81d8d0';
            }

            typingAction(event.key)
        }
        document.onkeyup = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#FFF';
            }
        }
    }, [count]);



    return (
        <div className='typing_area'>
            <TextArea originalText={originalText} kanaText={kanaText} typedText={typedText} remainingText={remainingText} />
            <Keyboard />
            {count}
        </div>
    )
}

export default TypingArea