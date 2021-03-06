import React, { useState } from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideNavi from './components/Menu/SideNavi';
import Header from './components/Menu/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TypingPage from './components/MainArea/TypingPage'
import TextRegistration from './components/MainArea/TextRegistration'
import Login from './components/Signup/Login'
import Signup from './components/Signup/Signup'
import Top from './components/MainArea/Top'
import Contact from './components/MainArea/Contact'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh'
    },
    toolbar: theme.mixins.toolbar,

    content: {
      flexGrow: 1,
      backgroundColor: '#edf7ff',
      paddingTop: '80px',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <SideNavi openState={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <main className={classes.content}>
          <Route exact path='/' render={() => <Top />} />
          <Route path='/typing' render={() => <TypingPage />} />
          <Route path='/TextRegistration' render={() => <TextRegistration />} />
          <Route path='/Login' render={() => <Login />} />
          <Route path='/Signup' render={() => <Signup />} />
          <Route path='/contact' render={() => <Contact />} />

        </main>
      </Router>
    </div>


  );


}

export default App;