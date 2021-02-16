import React, { useState, useEffect } from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import TextProcess from './util/TextProcess'
import { Sentence } from 'typing-ja';


const TypingArea = () => {

    const typingTexts = [
        { originalText: '犬も歩けば棒に当たる', kanaText: 'いぬもあるけばぼうにあたる' },
        { originalText: '猫に小判', kanaText: 'ねこにこばん' },
        { originalText: '豚に真珠', kanaText: 'ぶたにしんじゅ' },
        { originalText: '石の上にも三年', kanaText: 'いしのうえにもさんねん' },
    ]
    const [clearCount, setClearCount] = useState(0);
    const [originalText, setOriginalText] = useState(typingTexts[clearCount].originalText);
    const [kanaText, setKanaText] = useState(typingTexts[clearCount].kanaText);

    const [sentence, setSentence] = useState(new Sentence(kanaText));
    const [challenge, setChallenge] = useState(sentence.newChallenge());

    const [typedText, setTypedText] = useState(challenge.typedRoman);
    const [remainingText, setRemainingText] = useState(challenge.remainingRoman)

    const typingAction = (key) => {
        if (challenge.input(key)) {
            setTypedText(challenge.typedRoman);
            setRemainingText(challenge.remainingRoman);
            if (challenge.isCleared()) {
                const count = clearCount + 1;
                setClearCount(count);
                console.log(count);
                setOriginalText(typingTexts[count].originalText);
                setKanaText(typingTexts[count].kanaText);
                console.log(kanaText);

                setSentence(new Sentence(typingTexts[count].kanaText));
                setChallenge(sentence.newChallenge());

                setTypedText(challenge.typedRoman);
                setRemainingText(challenge.remainingRoman);
            }
        } else {
            document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 0, 0)';
            setTimeout(() => { document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 255, 255)' }, 25);

            //document.querySelector('.text_area').style.opacity = '0';
        }

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