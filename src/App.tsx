import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { CssBaseline, Typography } from '@material-ui/core';
import TypingArea from './components/TypingArea/TypingArea'





const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
          <TypingArea />
        </Typography>
      </Container>
    </>

  );
}

export default App;
