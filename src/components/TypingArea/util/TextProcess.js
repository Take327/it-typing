import { Sentence } from 'typing-ja';

class TextProcess {
    constructor(text) {
        this.sentence = new Sentence(text);
        this.challenge = this.sentence.newChallenge();
        this.remainingRoman = this.challenge.remainingRoman
    }


    input(inputText) {
        return this.challenge.input(inputText);
    }
}

export default TextProcess;

