import React from 'react';
import KeyLine from './KeyLine';

type KeyLineNumbers = number[];

const keyLineNumbers: KeyLineNumbers = [0, 1, 2, 3, 4]

const Keyboard: React.FC = () => {
    return (
        <div className="keyboard">
            {keyLineNumbers.map((value, index) => {
                return <KeyLine lineCode={value} key={index} />
            })}
        </div>
    );
}

export default Keyboard; 