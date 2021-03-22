import React, { useState, useEffect } from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideNavi from './components/Menu/SideNavi';
import Header from './components/Menu/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TypingPage from './components/MainArea/TypingPage'
import TextRegistration from './components/MainArea/TextRegistration'
import getDefault from './util/getDefault';

type typingText = {
  originalText: string,
  kanaText: string
}[]


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: '#edf7ff',
      height: '100vh',
      paddingTop: '60px'
    },
    typography: {
      height: '100vh',
      backgroundColor: '#cfe8fc'
    }
  }),
);

const App: React.FC = () => {

  const [typing, setTyping] = useState<typingText>([]);
  const [loadStatus, setLoadStatus] = useState<boolean>(false);

  const initialTyping = (json: typingText | undefined) => {
    if (json !== undefined) {
      setTyping(json)
      console.log(json)
    }
  }

  useEffect(() => {
    if (!loadStatus) {
      getDefault().then(json => initialTyping(json))
      setLoadStatus(true);
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Header />
        <SideNavi />
        <main className={classes.content}>
          <Route path='/typing' render={() => <TypingPage typingText={typing}/>} />
          <Route path='/TextRegistration' component={TextRegistration} />
        </main>
      </Router>
    </div>


  );


}

export default App;