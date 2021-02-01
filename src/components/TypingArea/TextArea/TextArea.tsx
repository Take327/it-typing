import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MainText from './MainText';
import KanaText from './KanaText';
import RomeText from './RomeText'
import './TextArea';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    }
});

const TextArea: React.FC = () => {

    const testText = {
        mainText: '犬も歩けば棒に当たる',
        kanaText: 'いぬもあるけばぼうにあたる',
        romeText: 'inumoarukebabouniataru'
    }

    const classes = useStyles();

    return (
        <Card className={`${classes.root} text_area`} variant="outlined">
            <MainText mainText={testText.mainText} />
            <KanaText kanaText={testText.kanaText} />
            <RomeText romeText={testText.romeText} />
        </Card>
    )
}

export default TextArea