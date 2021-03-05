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
            typingTexts: [],
            unmounted: false
        }
    }

    componentDidMount() {

        (async () => {
            //非同期でデータを取得

            //アンマウントされていなければステートを更新
            if (!this.state.unmounted) {
                console.log('async')
                getDefault().then(json => this.startText(json));
                this.setState({ unmounted: true });
            };

        })();

        document.onkeydown = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#81d8d0';
            }

            this.typingAction(event.key, this.state.count);
        }
        document.onkeyup = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                target.style.backgroundColor = '#FFF';
            }
        }
    }

    startText(startTexts) {

        this.setState({ originalText: startTexts[this.state.count].originalText });
        this.setState({ kanaText: startTexts[this.state.count].kanaText });

        this.setState({ typingTexts: startTexts });


        const typingInstanceArry = startTexts.map((value) => {
            return new Sentence(value.kanaText);
        });

        const challengeArry = typingInstanceArry.map((sentence) => {
            return sentence.newChallenge();
        });

        this.setState({ challenges: challengeArry });

        this.setState({ typedText: this.state.challenges[0].typedRoman });
        this.setState({ remainingText: this.state.challenges[0].remainingRoman })

    }




    typingAction(key, count) {
        console.log(count, this.state.challenges[count]);
        if (this.state.challenges[count].input(key)) {
            this.setState({ typedText: this.state.challenges[count].typedRoman });
            this.setState({ remainingText: this.state.challenges[count].remainingRoman });
            if (this.state.challenges[count].isCleared()) {
                if (count + 1 === this.state.challenges.length) {
                    alert('クリア');
                } else {
                    this.setState({ count: count + 1 });
                    this.nextText(count);
                }
            }
        } else {
            document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 0, 0)';
            setTimeout(() => { document.querySelector('.text_area').style.backgroundColor = 'rgb(255, 255, 255)' }, 25);
        }

    }

    nextText(count) {

        this.setState({ originalText: this.state.typingTexts[count].originalText });
        this.setState({ kanaText: this.state.typingTexts[count].kanaText });

        this.setState({ typedText: this.state.challenges[count].typedRoman });
        this.setState({ remainingText: this.state.challenges[count].remainingRoman })
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
