import React from 'react';
import './App.css';
import { CssBaseline, Typography } from '@material-ui/core';
import TypingArea from './components/TypingArea/TypingArea'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideNavi from './components/Menu/SideNavi';
import Header from './components/Menu/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TypingPage from './components/MainArea/TypingPage'
import TextRegistration from './components/MainArea/TextRegistration'


interface Props {
  window?: () => Window;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const App: React.FC = () => {


  const classes = useStyles();

  return (

    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Header />
        <SideNavi />

        <main className={classes.content}>
          <Route path='/typing' component={TypingPage} />
          <Route path='/TextRegistration' component={TextRegistration} />



        </main>
      </Router>
    </div>
  );


}

export default App;