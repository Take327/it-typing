import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MainText from './MainText';
import KanaText from './KanaText';
import RomeText from './RomeText'
import './TextArea';

type Props = {
    originalText: string,
    kanaText: string,
    typedText: string,
    remainingText: string,
}
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    }
});

const TextArea: React.FC<Props> = ({ originalText, kanaText, typedText, remainingText }) => {

    const classes = useStyles();

    return (
        <Card className={`${classes.root} text_area`} variant="outlined">
            <MainText mainText={originalText} />
            <KanaText kanaText={kanaText} />
            <RomeText typedText={typedText} remainingText={remainingText} />
        </Card>
    )
}

export default TextArea