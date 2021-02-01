import React from 'react';
import './KanaText.css';

type Props = {
    kanaText: string
}

const KanaText: React.FC<Props> = ({ kanaText }) => {

    return (
        <div className='kana_text'>
            {kanaText}
        </div>
    );
}

export default KanaText;
