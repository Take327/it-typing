import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { CssBaseline, Typography } from '@material-ui/core';
import Keybord from './components/TypingArea/keyboard/Keyboard';





const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
          <Keybord />
        </Typography>
      </Container>
    </>

  );
}

export default App;
