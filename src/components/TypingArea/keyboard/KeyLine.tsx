import React, { useState, useEffect } from 'react';
import KeyButtonNormal from './KeyButtonNormal'
import './KeyLine.css';

type Props = {
    key: string
}

type KeyLineValues = string[]

const fastLineValue: KeyLineValues = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "\\", "caps"];
const secondLineValue: KeyLineValues = ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "@", "["];
const thirdLineValue: KeyLineValues = ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "]"];
const forthLineValue: KeyLineValues = ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "\\", "", "shift"];
const fefthLineValue: KeyLineValues = ["ctrl", "", "", "", "space", "", "", "", "", "", "ctrl"];



const KeyLine: React.FC<Props> = ({ key }) => {
    const [keys, setKey] = useState('');

    useEffect(() => {
        console.log('test')
        setKey(key);
        console.log(keys)
    },[])


    return (
        <>
            <div className="key_line">
                {fastLineValue.map((value, index) => {
                    return <KeyButtonNormal keyValue={value} key={index} />
                })}
            </div>
            <div className="enter_area">
                <div className="enter_lines">
                    <div className="key_line">
                        {secondLineValue.map((value, index) => {
                            return <KeyButtonNormal keyValue={value} key={index} />
                        })}
                    </div>
                    <div className="key_line">
                        {thirdLineValue.map((value, index) => {
                            return <KeyButtonNormal keyValue={value} key={index} />
                        })}
                    </div>
                </div>
                <KeyButtonNormal keyValue="enter" />
            </div>
            <div className="key_line">
                {forthLineValue.map((value, index) => {
                    return <KeyButtonNormal keyValue={value} key={index} />
                })}
            </div>
            <div className="key_line">
                {fefthLineValue.map((value, index) => {
                    return <KeyButtonNormal keyValue={value} key={index} />
                })}
            </div>
        </>
    )
}

export default KeyLine;