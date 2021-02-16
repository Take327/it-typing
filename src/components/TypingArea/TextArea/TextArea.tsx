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
    romeText: string
}
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    }
});

const TextArea: React.FC<Props> = ({ originalText, kanaText, romeText }) => {
    const testText = {
        mainText: '犬も歩けば棒に当たる',
        kanaText: 'いぬもあるけばぼうにあたる',
        romeText: 'inumoarukebabouniataru'
    }




    const classes = useStyles();

    return (
        <Card className={`${classes.root} text_area`} variant="outlined">
            <MainText mainText={originalText} />
            <KanaText kanaText={kanaText} />
            <RomeText romeText={romeText} />
        </Card>
    )
}

export default TextArea