import React, { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { CssBaseline, Typography } from '@material-ui/core';
import TypingArea from './components/TypingArea/TypingArea'
import getDefault from './util/getDefault';

const App: React.FC = () => {
  const [defaultTexts, setDefaultTexts] = useState<Object | null>(getDefault().then(json => json));

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', alignContent: 'center' }} >
          <TypingArea kotowaza={defaultTexts} />
        </Typography>
        {JSON.stringify(defaultTexts)}
      </Container>
    </>

  );
}

export default App;
