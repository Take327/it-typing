import React, { useState, useEffect, useReducer } from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import { Sentence } from 'typing-ja';
import getDefault from '../../util/getDefault';


class TypingArea extends React.Component {
    constructor(props) {
        super();

        this.state = {
            count: 0,
            originalText: '',
            kanaText: '',
            typedText: '',
            remainingText: '',
            challenges: [],
            typingTexts: []
        }
    }

    componentDidMount() {
        document.onkeydown = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#81d8d0';
            }

            //typingAction(event.key, props.clearCount);
        }
        document.onkeyup = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#FFF';
            }
        }
    }


    render() {

        return (
            <div className='typing_area'>
                <TextArea originalText={this.state.originalText} kanaText={this.state.kanaText} typedText={this.state.typedText} remainingText={this.state.remainingText} />
                <Keyboard />
                {this.state.count}
            </div>
        )
    }

}

export default TypingArea

/*
const TypingArea = (props) => {

    const [originalText, setOriginalText] = useState('');
    const [kanaText, setKanaText] = useState('');


    const [typedText, setTypedText] = useState('');
    const [remainingText, setRemainingText] = useState('');

    const [challenges, setChallenges] = useState([]);
    const [typingTexts, setTypingText] = useState([]);



    const startText = (startTexts) => {

        setOriginalText(startTexts[props.clearCount].originalText);
        setKanaText(startTexts[props.clearCount].kanaText);

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


    const nextText = (clearCount) => {
        console.log(clearCount)
        setOriginalText(typingTexts[clearCount].originalText);
        setKanaText(typingTexts[clearCount].kanaText);

        setTypedText(challenges[clearCount].typedRoman);
        setRemainingText(challenges[clearCount].remainingRoman);

    }

    const typingAction = (key, clearCount) => {
        console.log(clearCount,challenges[clearCount]);
        if (challenges[clearCount].input(key)) {
            setTypedText(challenges[clearCount].typedRoman);
            setRemainingText(challenges[clearCount].remainingRoman);
            if (challenges[clearCount].isCleared()) {
                if (clearCount + 1 === challenges.length) {
                    alert('クリア');
                } else {
                    props.clearCountUp();
                    nextText(clearCount);
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
                console.log('async')
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

            typingAction(event.key, props.clearCount);
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
            {props.clearCount}
        </div>
    )
}

*/
