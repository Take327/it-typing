import React from 'react';
import TextArea from './TextArea/TextArea';
import Keyboard from './keyboard/Keyboard';
import './TypingArea.css';

const TypingArea: React.FC = () => {

    return (
        <div className='typing_area'>
            <TextArea />
            <Keyboard />
        </div>
    )
}

export default TypingArea