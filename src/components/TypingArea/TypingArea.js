import React from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';
import { Sentence } from '../../util/typing-ja';


class TypingArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            originalText: 'スペースキーを押してください。',
            kanaText: '',
            typedText: '',
            remainingText: '',
            challenges: [],
            typingTexts: [],
            unmounted: false,
            initialize: false
        }


    }

    componentDidMount() {

        (async () => {
            //非同期でデータを取得

            //アンマウントされていなければステートを更新
            if (!this.state.unmounted) {
                console.log('async')
                //getDefault().then(json => this.startText(json));
                this.setState({ unmounted: true });
            };

        })();

        document.onkeydown = (event) => {
            if (this.state.initialize) {
                const targetId = event.keyCode + '_button';
                const target = document.getElementById(targetId);
                if (target) {
                    target.style.backgroundColor = '#81d8d0';
                }

                this.typingAction(event.key, this.state.count);
            } else {
                if (event.key === ' ') {
                    this.startText(this.props.typingText);
                    this.setState({ initialize: true });

                }
            }
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
        if (startTexts.length !== 0) {
            console.log("startText", startTexts);
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

    }




    typingAction(key, count) {
        if (this.state.challenges[count].input(key)) {
            this.setState({ typedText: this.state.challenges[count].typedRoman });
            this.setState({ remainingText: this.state.challenges[count].remainingRoman });
            if (this.state.challenges[count].isCleared()) {
                if (count + 1 === this.state.challenges.length) {
                    alert('クリア');
                } else {
                    this.setState({ count: count + 1 });
                    this.nextText(this.state.count);
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
            </div>
        )
    }

}

export default TypingArea

