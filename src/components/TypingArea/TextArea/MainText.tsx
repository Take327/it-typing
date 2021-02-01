import React from 'react';
import './MainText.css';

type Props = {
    mainText: string
}

const MainText: React.FC<Props> = ({ mainText }) => {

    return (
        <div className='main_text'>
            {mainText}
        </div>
    );

}

export default MainText