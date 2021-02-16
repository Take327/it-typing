import React from 'react';
import './RomeText.css';

type Props = {
    typedText: string,
    remainingText: string
}

const RomeText: React.FC<Props> = ({ typedText, remainingText }) => {

    return (
        <div className='rome_text'>
            <div className='typed_text'>
                {typedText}
            </div>
            <div className='remaining_text'>
                {remainingText}
            </div>
        </div>
    );
}

export default RomeText;