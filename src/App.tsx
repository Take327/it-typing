import React, { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { CssBaseline, Typography } from '@material-ui/core';
import TypingArea from './components/TypingArea/TypingArea'
import getDefault from './util/getDefault';

const App: React.FC = () => {

  const start = [
    {
      originalText: "犬も歩けば棒に当たる",
      kanaText: "いぬもあるけばぼうにあたる"
    }
  ]

  const [defaultTexts, setDefaultTexts] = useState<Object | null>(start);

  const geter = () => {
    getDefault().then(json => {
      if (json === null) {
        return null;
      } else {
        setDefaultTexts(json.kotowaza)
      }
    }
    )
  }
console.log(defaultTexts);



return (
  <>
    <CssBaseline />
    <Container fixed>
      <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', alignContent: 'center' }} >
        <TypingArea kotowaza={defaultTexts} geter={geter} />
      </Typography>
      {JSON.stringify(defaultTexts)}
    </Container>
  </>

);
}

export default App;
