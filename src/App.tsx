import React from 'react';
import './App.css';
import { CssBaseline, Typography } from '@material-ui/core';
import TypingArea from './components/TypingArea/TypingArea'
import TemporaryDrawer from './components/Menu/TemporaryDrawer'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SideNavi from './components/Menu/SideNavi';
import Header from './components/Menu/Header'

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
      <CssBaseline />
      <Header />
      <SideNavi />

      <main className={classes.content}>
        <TemporaryDrawer />
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', alignContent: 'center' }} >
          <TypingArea />
        </Typography>
      </main>
    </div>
  );


}

export default App;