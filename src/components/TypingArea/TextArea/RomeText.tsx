import React from 'react';
import './RomeText.css';

type Props = {
    romeText: string
}

const RomeText: React.FC<Props> = ({ romeText }) => {

    return (
        <div className='rome_text'>
            {romeText}
        </div>
    );
}

export default RomeText;