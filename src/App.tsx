import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideNavi from './components/Menu/SideNavi';
import Header from './components/Menu/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TypingPage from './components/MainArea/TypingPage'
import TextRegistration from './components/MainArea/TextRegistration'
import Signup from './components/Signup/Signup'

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
      paddingTop: '70px'
    },
    typography: {
      height: '100vh',
      backgroundColor: '#cfe8fc'
    }
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Header />
        <SideNavi loginState={false} />
        <main className={classes.content}>
          <Route path='/typing' render={() => <TypingPage />} />
          <Route path='/TextRegistration' render={() => <TextRegistration />} />
          <Route path='/Signup' render={() => <Signup />} />
        </main>
      </Router>
    </div>


  );


}

export default App;