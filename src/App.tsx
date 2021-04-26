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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const [loginState, setLoginState] = useState<boolean>(false);

  const changeLoginState = (state: boolean) => {
    setLoginState(state);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Header openState={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <SideNavi loginState={loginState} changeLoginState={changeLoginState} openState={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <main className={classes.content}>
          <Route path='/typing' render={() => <TypingPage loginStatus={loginState} />} />
          <Route path='/TextRegistration' render={() => <TextRegistration loginStatus={loginState} />} />
          <Route path='/Login' render={() => <Login changeLoginState={changeLoginState} />} />
          <Route path='/Signup' render={() => <Signup changeLoginState={changeLoginState} />} />
        </main>
      </Router>
    </div>


  );


}

export default App;