import React, { useState, useEffect, useReducer } from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import { Sentence } from 'typing-ja';
import getDefault from '../../util/getDefault';



const TypingArea = (props) => {

    const reducerFunc = (countState) => {
        const result = countState + 1;
        console.log(result)
        return result;
    }

    const [count, setCount] = useReducer(reducerFunc,0);

    const [originalText, setOriginalText] = useState('');
    const [kanaText, setKanaText] = useState('');


    const [typedText, setTypedText] = useState('');
    const [remainingText, setRemainingText] = useState('');

    const [challenges, setChallenges] = useState([]);
    const [typingTexts, setTypingText] = useState([]);


    const startText = (startTexts) => {

        setOriginalText(startTexts[0].originalText);
        setKanaText(startTexts[0].kanaText);

        const typingInstanceArry = startTexts.map((value) => {
            typingTexts.push(value);
            return new Sentence(value.kanaText);
        });
        const challengeArry = typingInstanceArry.map((sentence) => {
            challenges.push(sentence.newChallenge());
        });

        setChallenges(challengeArry)
        setTypedText(challenges[0].typedRoman);
        setRemainingText(challenges[0].remainingRoman);
        setTypingText(typingTexts);
    }


    const nextText = (count) => {
        const nextCount = count +1;
        setOriginalText(typingTexts[nextCount].originalText);
        setKanaText(typingTexts[nextCount].kanaText);

        setTypedText(challenges[nextCount].typedRoman);
        setRemainingText(challenges[nextCount].remainingRoman);
        setCount();
    }

    const typingAction = (key,count) => {
        console.log(challenges);
        if (challenges[count].input(key)) {
            setTypedText(challenges[count].typedRoman);
            setRemainingText(challenges[count].remainingRoman);
            if (challenges[count].isCleared()) {
                if (count + 1 === challenges.length) {
                    alert('クリア');
                } else {
                    nextText(count);
                    console.log(count);
                }
            }
        } else {
            document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 0, 0)';
            setTimeout(() => { document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 255, 255)' }, 25);
        }

    }


    const [unmounted, setUnmounted] = useState(false)

    useEffect(() => {

        //非同期無名関数の即時呼び出し
        (async () => {

            //非同期でデータを取得

            //アンマウントされていなければステートを更新
            if (!unmounted) {
                getDefault().then(json => startText(json));
                setUnmounted(true);
            };

        })();

        document.onkeydown = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#81d8d0';
            }

            typingAction(event.key,count);
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