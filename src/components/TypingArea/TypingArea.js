import React, { useState, useEffect, useReducer } from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import { Sentence } from 'typing-ja';
import getDefault from '../../util/getDefault';



const TypingArea = (props) => {

    const reducerFunc = (countState) => {
        return countState + 1;
    }

    const [count, dispatch] = useReducer(reducerFunc, 0);

    const typingTexts = props.kotowaza;
    console.log(typingTexts)

    const [originalText, setOriginalText] = useState('');
    const [kanaText, setKanaText] = useState('');


    const [typedText, setTypedText] = useState('');
    const [remainingText, setRemainingText] = useState('');


    const startText = (typingTexts) => {

        const typingInstances = typingTexts.map((value) => {
            return new Sentence(value.kanaText);
        });
    
        const challenges = typingInstances.map((sentence) => {
            return sentence.newChallenge();
        })

        setOriginalText(typingTexts[0].originalText);
        setKanaText(typingTexts[0].kanaText);



        setTypedText(challenges[0].typedRoman);
        setRemainingText(challenges[0].remainingRoman);
    }


    const nextText = (count) => {
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
                if (count + 1 === typingTexts.length) {
                    alert('クリア');
                } else {
                    dispatch();
                }
            }
        } else {
            document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 0, 0)';
            setTimeout(() => { document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 255, 255)' }, 25);
        }

    }

    useEffect(() => {

        (() => {
            console.log('tester')
        })();

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
        </div>
    )
}

export default TypingArea