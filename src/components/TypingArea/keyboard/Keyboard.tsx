import React, { useState, useEffect } from 'react';
import KeyLine from './KeyLine';
import './Keyboard.css';

const Keyboard: React.FC = () => {
    const [key, setKey] = useState('');


    useEffect(() => {
        document.onkeydown = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                console.log(target);
                target.style.backgroundColor = '#81d8d0';
            }
        }
        document.onkeyup = (event) => {
            const targetId = event.keyCode + '_button';
            const target = document.getElementById(targetId);
            if (target) {
                console.log(target);
                target.style.backgroundColor = '#FFF';
            }
        }
    }, []);

    return (
        <div className="keyboard">
            <KeyLine key={key} />
        </div>
    );
}

export default Keyboard; 